using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
namespace RealEstateBackEnd.Services
{
    public class FileServices
    {
        private readonly IWebHostEnvironment _environment;

        public FileServices(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<string> SaveFile(IFormFile imagefile, string[] allowedFileExtension)
        {
            if (imagefile == null)
            {
                throw new ArgumentNullException("Image file is required");
            }

            var contentPath = _environment.ContentRootPath;
            var path = Path.Combine(contentPath, "Uploads");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            var fileExtension = Path.GetExtension(imagefile.FileName);
            if (!allowedFileExtension.Contains(fileExtension))
            {
                throw new ArgumentException($"Only {string.Join(",", allowedFileExtension)} are allowed");
            }

            var fileName = $"{Guid.NewGuid().ToString()}{fileExtension}";
            var fileNameWithPath = Path.Combine(path, fileName);
            using var stream = new FileStream(fileNameWithPath, FileMode.Create);
            await imagefile.CopyToAsync(stream);
            return fileName;
        }

        public string DeleteFile(string fileNameWithExtention)
        {
            if(string.IsNullOrEmpty(fileNameWithExtention))
            {
                throw new ArgumentNullException("File name is required");
            }
            var contentPath = _environment.ContentRootPath;
            var path = Path.Combine(contentPath, $"Uploads",fileNameWithExtention);
            if(!File.Exists(path))
            {
                return "File already deleted";
            }
            File.Delete(path);
            return "successfully deleted";
        }
    }
}
