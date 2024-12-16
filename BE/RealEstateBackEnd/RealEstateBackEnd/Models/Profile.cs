using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstateBackEnd.Models
{
    public class Profile
    {
        [Key]
        public int Id { get; set; }
        [MaxLength(100)]
        public string? FirstName { get; set; }
        [MaxLength(100)]
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public DateOnly DoB { get; set; }
        public IList<string> ImageURL { get; set; } = new List<string>();
        [Display(Name = "Phone number")]
        [RegularExpression("[0-9]{10}")]
        public string PhoneNumber { get; set; } = string.Empty;
        public double Rating { get; set; }
        public string IdentiticationNumber { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        [ForeignKey(nameof(AppUser))]
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; } = null!;
    }
}
