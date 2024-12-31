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
    public class FollowsController : ControllerBase
    {
        private readonly RealEstateBackEndContext _context;

        public FollowsController(RealEstateBackEndContext context)
        {
            _context = context;
        }

        // GET: api/Follows
        [HttpGet("{id}")]
        public async Task<ActionResult<Follow>> GetFollow(int id)
        {
            if (id == 0 || id == null)
            {
                return NotFound();
            }
            return await _context.Follow.Include(f => f.Following).FirstOrDefaultAsync(f => f.Id == id);
        }

        // PUT: api/Follows/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"),Authorize]
        public async Task<IActionResult> PutFollow(int id, [FromQuery] int Profileid)
        {
            var user = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var profile = await _context.Profile.FirstOrDefaultAsync(p => p.Id == Profileid);
            if (profile == null)
            {
                return NotFound();
            }
            var follow = await _context.Follow.Include(f => f.Following).FirstOrDefaultAsync(f => f.Id == id);
            if (follow == null)
            {
                return NotFound();
            }

            if(!follow.Following.Any(p => p.Id == profile.Id))
            {
                follow.Following.Add(profile);
            }
            else
            {
                return Ok("Already following this profile");
            }

            _context.Entry(follow).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FollowExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("follow succesffully");
        }

        // DELETE: api/Follows/5
        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteFollow(int id, [FromQuery] int Profileid)
        {
            var profile = await _context.Profile.FirstOrDefaultAsync(p => p.Id == Profileid);
            if (profile == null)
            {
                return Ok("there no such profile");
            }
            
            var follow = await _context.Follow.Include(f => f.Following).FirstOrDefaultAsync(f => f.Id == id);
            if (follow == null)
            {
                return NotFound();
            }
            if (follow.Following.Any(p => p.Id == profile.Id))
            {
                follow.Following.Remove(profile);
            }
            else
            {
                return Ok("not following this profile");
            }

            await _context.SaveChangesAsync();

            return Ok("unfollow successfully");
        }

        private bool FollowExists(int id)
        {
            return _context.Follow.Any(e => e.Id == id);
        }
    }
}
