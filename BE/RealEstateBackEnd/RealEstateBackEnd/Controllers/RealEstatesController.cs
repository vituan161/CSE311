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
using RealEstateBackEnd.Services;

namespace RealEstateBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RealEstatesController : ControllerBase
    {
        private readonly RealEstateBackEndContext _context;
        private readonly FileServices _fileServices;
        public RealEstatesController(RealEstateBackEndContext context, FileServices fileServices)
        {
            _context = context;
            _fileServices = fileServices;
        }

        //// GET: api/RealEstates
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<RealEstate>>> GetRealEstate(int page = 1, int pageSize = 10)
        //{
        //    var totalRealEstates = _context.RealEstate.Count();
        //    var totalPages = (int)Math.Ceiling((decimal)totalRealEstates / (decimal)pageSize);
        //    if (page > totalPages || page <= 0)
        //    {
        //        return Ok("Start from page 1 and end in page "+totalPages+" , There is no page "+page);
        //    }
        //    var realEstatesPerPage = await _context.RealEstate
        //        .Skip(pageSize * (page - 1))
        //        .Take(pageSize).Include(r => r.Prices)
        //        .ToListAsync();
        //    //await _context.RealEstate.Include(r => r.Prices).ToListAsync();
        //    return realEstatesPerPage;
        //}

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
            var realEstate = await _context.RealEstate.Include(r => r.Prices).FirstOrDefaultAsync(r => r.Id == id);

            if (realEstate == null)
            {
                return NotFound();
            }

            return realEstate;
        }
        // GET: api/Filter
        [HttpGet("Filter")]
        public async Task<ActionResult<IEnumerable<RealEstate>>> FilterRealEstates(
           [FromQuery] RealEstateType? type,
           [FromQuery] Choice? choice,
           [FromQuery] string? province,
           [FromQuery] string? city,
           [FromQuery] string? address,
           [FromQuery] decimal? minPrice,
           [FromQuery] decimal? maxPrice)
        {
            var query = _context.RealEstate.Include(r => r.Prices).AsQueryable();

            if (choice.HasValue)
            {
                query = query.Where(r => r.choices == choice.Value);
            }

            if (type.HasValue)
            {
                query = query.Where(r => r.Type == type.Value);
            }


            if (!string.IsNullOrEmpty(province))
            {
                var provinceLower = province.ToLower();
                query = query.Where(r => r.Address.ToLower().Contains(provinceLower));
            }

            if (!string.IsNullOrEmpty(city))
            {
                var cityLower = city.ToLower();
                query = query.Where(r => r.Address.ToLower().Contains(cityLower));
            }

            if (!string.IsNullOrEmpty(address))
            {
                var addressLower = address.ToLower();
                query = query.Where(r => r.Address.ToLower().Contains(addressLower));
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

        //[HttpGet("MyRealEstate"), Authorize]
        //public async Task<ActionResult<IEnumerable<RealEstate>>> GetMyRealEstate(int page = 1, int pageSize = 10)
        //{
        //    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        //    if (userId == null)
        //    {
        //        return Unauthorized();
        //    }
        //    int id = int.Parse(userId);
        //    var realEstates = await _context.RealEstate.Include(r => r.Prices).Where(r => r.Seller.UserId == id).ToListAsync();

        //    if (realEstates == null)
        //    {
        //        return NotFound();
        //    }

        //    var totalRealEstates = realEstates.Count();
        //    var totalPages = (int)Math.Ceiling((decimal)totalRealEstates / (decimal)pageSize);
        //    if (page > totalPages || page <= 0)
        //    {
        //        return Ok("Start from page 1 and end in page " + totalPages + " , There is no page " + page);
        //    }
        //    var realEstatesPerPage = await _context.RealEstate.Include(r => r.Prices).Where(r => r.Seller.UserId == id)
        //        .Skip(pageSize * (page - 1))
        //        .Take(pageSize)
        //        .ToListAsync();
        //    return realEstatesPerPage;
        //}

        [HttpGet("MyRealEstate"), Authorize]
        public async Task<ActionResult<IEnumerable<RealEstate>>> GetMyRealEstate()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            int id = int.Parse(userId);
            var realEstates = await _context.RealEstate.Include(r => r.Prices).Where(r => r.Seller.UserId == id).ToListAsync();

            if (realEstates == null)
            {
                return NotFound();
            }

            return realEstates;
        }

        // PUT: api/RealEstates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"),Authorize]
        public async Task<IActionResult> PutRealEstate(int id, RealEstate UpdatedrealEstate)
        {
            if (id != UpdatedrealEstate.Id)
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
            currentRealEstate.Name = UpdatedrealEstate.Name;
            currentRealEstate.Area = UpdatedrealEstate.Area;
            currentRealEstate.Address = UpdatedrealEstate.Address;
            currentRealEstate.Link = UpdatedrealEstate.Link;
            currentRealEstate.Imageurl = UpdatedrealEstate.Imageurl;
            currentRealEstate.Description = UpdatedrealEstate.Description;
            currentRealEstate.Design = UpdatedrealEstate.Design;
            currentRealEstate.Legality = UpdatedrealEstate.Legality;
            currentRealEstate.Type = UpdatedrealEstate.Type;
            currentRealEstate.DateExprired = UpdatedrealEstate.DateExprired;
            currentRealEstate.Status = UpdatedrealEstate.Status;
            currentRealEstate.choices = UpdatedrealEstate.choices;
            currentRealEstate.Location=UpdatedrealEstate.Location;

            //check if the prices are provided in the request
            if (UpdatedrealEstate.Prices != null && UpdatedrealEstate.Prices.Count > 0)
            {
                foreach (var price in UpdatedrealEstate.Prices)
                {
                    // Add each Price object to the context so they get created in the database
                    currentRealEstate.Prices.Add(price);
                }
            }

            // update image
            var UpdatedImages = UpdatedrealEstate.Images;
            if (UpdatedImages != null && UpdatedImages.Count > 0)
            {
                foreach(var currentImage in currentRealEstate.Imageurl)
                {
                    _fileServices.DeleteFile(currentImage);
                }
            }

            IList<string> imageUrls = new List<string>();
            string[] allowedFileExtension = { ".jpg", ".jpeg", ".png" };
            if (UpdatedImages != null && UpdatedImages.Count > 0)
            {
                foreach (var UpdatedImage in UpdatedImages)
                {
                    var imageUrl = await _fileServices.SaveFile(UpdatedImage, allowedFileExtension);
                    imageUrls.Add(imageUrl.ToString());
                }
            }

            currentRealEstate.Imageurl = imageUrls;

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
        public async Task<ActionResult<RealEstate>> PostRealEstate([FromForm]RealEstate realEstate)
        {
            if(realEstate == null || realEstate.Prices.Count == 0)
            {
                return BadRequest("Does not have Prices");
            }
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

            // Check if images are provided in the request
            var images = realEstate.Images;
            string[] allowedFileExtension = { ".jpg", ".jpeg", ".png" };
            IList<string> imageUrls = new List<string>();
            if (images != null && images.Count > 0)
            {
                foreach (var image in images)
                {
                    // Save each image to the file system and store the URL in the ImageURL property
                    var imageUrl = await _fileServices.SaveFile(image,allowedFileExtension);
                    imageUrls.Add(imageUrl.ToString());
                }
            }
            realEstate.Imageurl = imageUrls;

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
