using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
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
    public class ProfilesController : ControllerBase
    {
        private readonly RealEstateBackEndContext _context;
        private readonly FileServices _fileServices;

        public ProfilesController(RealEstateBackEndContext context,FileServices fileServices)
        {
            _context = context;
            _fileServices = fileServices;
        }

        // GET: api/Profiles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profile>>> GetProfile()
        {
            return await _context.Profile.ToListAsync();
        }

        // GET: api/Profiles/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Profile>> GetProfile(int id)
        {
            var profile = await _context.Profile.Include(p => p.AppUser).FirstOrDefaultAsync(p => p.Id == id);

            if (profile == null)
            {
                return NotFound();
            }

            return profile;
        }

        [HttpGet("GetMyProfile"),Authorize]
        public async Task<ActionResult<Profile>> GetMyProfile()
        {
            var usesId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (usesId == null)
            {
                return Unauthorized();
            }
            int id = int.Parse(usesId);
            var profile = await _context.Profile.Include(p => p.AppUser).ThenInclude(u => u.Follow).ThenInclude(f => f.Following).FirstOrDefaultAsync(p => p.AppUserId == id);
            if(profile == null)
            {
                return NotFound();
            }
            return profile;
        }


        // PUT: api/Profiles/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut, Authorize]
        public async Task<IActionResult> PutProfile([FromForm] Profile Updatedprofile)
        {
            if(Updatedprofile == null)
            {
                return BadRequest();
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            int id = int.Parse(userId);
            // Retrieve the existing profile using AsNoTracking
            Profile currentProfile = await _context.Profile.AsNoTracking().FirstOrDefaultAsync(p => p.Id == id);
            if(currentProfile == null)
            {
                return NotFound();
            }
            // Ensure the updated profile has the correct ID and AppUserId
            Updatedprofile.Id = id;
            Updatedprofile.AppUserId = currentProfile.AppUserId;

            //update the images
            var currentImages = currentProfile.ImageURL;
            var newImages = Updatedprofile.Images;
            if (newImages != null && newImages.Count > 0)
            {
                foreach (var currentimage in currentImages)
                {
                    _fileServices.DeleteFile(currentimage);
                }
            }
            IList<string> imageUrls = new List<string>();
            string[] allowedFileExtension = { ".jpg", ".jpeg", ".png" };
            if (newImages != null && newImages.Count > 0)
            {
                foreach (var newImage in newImages)
                {
                    var imageUrl = await _fileServices.SaveFile(newImage, allowedFileExtension);
                    imageUrls.Add(imageUrl.ToString());
                }
            }

            Updatedprofile.ImageURL = imageUrls;

            // Attach the updated profile to the context and set its state to Modified
            _context.Entry(Updatedprofile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfileExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(new { message = "Profile updated successfully" });
        }

        // POST: api/Profiles
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize]
        public async Task<ActionResult<Profile>> PostProfile(Profile profile)
        {
            _context.Profile.Add(profile);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProfile", new { id = profile.Id }, profile);
        }

        // DELETE: api/Profiles/5
        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteProfile(int id)
        {
            var profile = await _context.Profile.FindAsync(id);
            if (profile == null)
            {
                return NotFound();
            }

            _context.Profile.Remove(profile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfileExists(int id)
        {
            return _context.Profile.Any(e => e.Id == id);
        }
    }
}
