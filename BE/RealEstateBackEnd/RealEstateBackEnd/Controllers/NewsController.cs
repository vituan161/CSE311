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
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace RealEstateBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly RealEstateBackEndContext _context;
        private readonly FileServices _fileServices;

        public NewsController(RealEstateBackEndContext context, FileServices fileServices)
        {
            _context = context;
            _fileServices = fileServices;
        }

        // GET: api/News
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetNews()
        {
            return await _context.News.ToListAsync();
        }

        // GET: api/News/5
        [HttpGet("{id}")]
        public async Task<ActionResult<News>> GetNews(int id)
        {
            var news = await _context.News.FindAsync(id);

            if (news == null)
            {
                return NotFound();
            }

            return news;
        }

        // PUT: api/News/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"),Authorize]
        public async Task<IActionResult> PutNews(int id, News news)
        {
            if (id != news.Id)
            {
                return BadRequest();
            }

            _context.Entry(news).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/News
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize]
        public async Task<ActionResult<News>> PostNews([FromForm] News news)
        {
            //get the id of the user who is currently logged in
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            //find the seller with the same user id
            Seller seller = await _context.Seller.Where(s => s.UserId == Int32.Parse(userId)).Include(s => s.User).Include(s => s.AgencyCompany).FirstOrDefaultAsync();

            var images = news.Images;
            string[] allowedFileExtension = { ".jpg", ".jpeg", ".png" };
            IList<string> imageUrls = new List<string>();
            if (images != null && images.Count > 0)
            {
                foreach (var image in images)
                {
                    // Save each image to the file system and store the URL in the ImageURL property
                    var imageUrl = await _fileServices.SaveFile(image, allowedFileExtension);
                    imageUrls.Add(imageUrl.ToString());
                }
            }
            news.Imageurl = imageUrls;

            if (seller == null)
            {
                return NotFound();
            }
            else
            {
                if (seller.AgencyCompanyId != null && seller.User.IsOfficial)
                {
                    news.CompanyId = seller.AgencyCompanyId.Value;
                    _context.News.Add(news);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    return Unauthorized();
                }
            }

            return CreatedAtAction("GetNews", new { id = news.Id }, news);
        }

        // DELETE: api/News/5
        [HttpDelete("{id}"), Authorize]
        public async Task<IActionResult> DeleteNews(int id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }

            _context.News.Remove(news);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool NewsExists(int id)
        {
            return _context.News.Any(e => e.Id == id);
        }
    }
}
