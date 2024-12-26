using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RealEstateBackEnd.Data;
using RealEstateBackEnd.Models;

namespace RealEstateBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RealEstatesController : ControllerBase
    {
        private readonly RealEstateBackEndContext _context;

        public RealEstatesController(RealEstateBackEndContext context)
        {
            _context = context;
        }

        // GET: api/RealEstates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RealEstate>>> GetRealEstate()
        {
            return await _context.RealEstate.Include(r => r.Prices).ToListAsync();
        }

        // GET: api/RealEstates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RealEstate>> GetRealEstate(int id)
        {
            var realEstate = await _context.RealEstate.FindAsync(id);

            if (realEstate == null)
            {
                return NotFound();
            }

            return realEstate;
        }
        [HttpGet("Filter")]
        public async Task<ActionResult<IEnumerable<RealEstate>>> FilterRealEstates(
           [FromQuery] RealEstateType? type,
           [FromQuery] string? province,
           [FromQuery] string? address,
           [FromQuery] decimal? minPrice,
           [FromQuery] decimal? maxPrice)
        {
            var query = _context.RealEstate.Include(r => r.Prices).AsQueryable();

            if (type.HasValue)
            {
                query = query.Where(r => r.Type == type.Value);
            }

            if (!string.IsNullOrEmpty(province))
            {
                query = query.Where(r => r.Address.Contains(province, StringComparison.OrdinalIgnoreCase));
            }

            if (!string.IsNullOrEmpty(address))
            {
                query = query.Where(r => r.Address.Contains(address, StringComparison.OrdinalIgnoreCase));
            }

            if (minPrice.HasValue || maxPrice.HasValue)
            {
                query = query.Where(r => r.Prices.Any(p =>
                    (!minPrice.HasValue || p.PriceValue >= minPrice.Value) &&
                    (!maxPrice.HasValue || p.PriceValue <= maxPrice.Value)));
            }

            var result = await query.ToListAsync();

            return Ok(result);
        }

        // PUT: api/RealEstates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"),Authorize]
        public async Task<IActionResult> PutRealEstate(int id, RealEstate realEstate)
        {
            if (id != realEstate.Id)
            {
                return BadRequest();
            }
            // Fetch the current state of the RealEstate entity from the database
            var currentRealEstate = await _context.RealEstate.Include(r => r.Prices).FirstOrDefaultAsync(r => r.Id == id);
            if (currentRealEstate == null)
            {
                return NotFound();
            }

            // Update the properties that are present in the request
            currentRealEstate.Name = realEstate.Name;
            currentRealEstate.Area = realEstate.Area;
            currentRealEstate.Address = realEstate.Address;
            currentRealEstate.Link = realEstate.Link;
            currentRealEstate.Imageurl = realEstate.Imageurl;
            currentRealEstate.Description = realEstate.Description;
            currentRealEstate.Design = realEstate.Design;
            currentRealEstate.Legality = realEstate.Legality;
            currentRealEstate.Type = realEstate.Type;
            currentRealEstate.DateExprired = realEstate.DateExprired;
            currentRealEstate.Status = realEstate.Status;

            //check if the prices are provided in the request
            if (realEstate.Prices != null && realEstate.Prices.Count > 0)
            {
                foreach (var price in realEstate.Prices)
                {
                    // Add each Price object to the context so they get created in the database
                    currentRealEstate.Prices.Add(price);
                }
            }

            try
            {
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RealEstateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

        }

        // POST: api/RealEstates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost,Authorize]
        public async Task<ActionResult<RealEstate>> PostRealEstate(RealEstate realEstate)
        {
            //get the id of the user who is currently logged in
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            //find the seller with the same user id
            var seller = await _context.Seller.Include(s => s.User).FirstOrDefaultAsync(s => s.UserId == int.Parse(userId));
            //if the seller does not exist, create a new seller
            if (seller == null)
            {
                seller = new Seller { UserId = int.Parse(userId) };
                _context.Seller.Add(seller);
                await _context.SaveChangesAsync();
            }
            //set the seller id of the real estate to the id of the seller
            realEstate.SellerId = seller.Id;
            realEstate.Seller = seller;

            // Check if prices are provided in the request
            if (realEstate.Prices != null && realEstate.Prices.Count > 0)
            {
                foreach (var price in realEstate.Prices)
                {
                    // Add each Price object to the context so they get created in the database
                    price.RealEstateId = realEstate.Id;
                    price.RealEstate = realEstate;
                    _context.Price.Add(price);
                }
            }

            _context.RealEstate.Add(realEstate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRealEstate", new { id = realEstate.Id }, realEstate);
        }

        // DELETE: api/RealEstates/5
        [HttpDelete("{id}"),Authorize]
        public async Task<IActionResult> DeleteRealEstate(int id)
        {
            var realEstate = await _context.RealEstate.FindAsync(id);
            if (realEstate == null)
            {
                return NotFound();
            }

            _context.RealEstate.Remove(realEstate);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Delete successfully" });
        }

        private bool RealEstateExists(int id)
        {
            return _context.RealEstate.Any(e => e.Id == id);
        }
    }
}
