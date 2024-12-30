using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstateBackEnd.Models
{
    public class Company
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string MainField { get; set; } = String.Empty;
        public string Address { get; set; } = String.Empty;
        public string Link { get; set; } = String.Empty;
        public IList<string> Imageurl { get; set; } = new List<string>();
        [NotMapped]
        public IList<IFormFile>? Images { get; set; } = new List<IFormFile>();
        [Display(Name = "Phone number")]
        [RegularExpression("[0-9]{10}")]
        public string Phone { get; set; } = String.Empty;
        public string Email { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        public ICollection<News> News { get; set; } = new List<News>();
    }

    public enum MainField
    {
        RealEstate,
        Construction,
        Design
    }
}
