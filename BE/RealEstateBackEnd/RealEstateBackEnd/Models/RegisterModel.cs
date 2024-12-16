using System.ComponentModel.DataAnnotations;

namespace RealEstateAPI.Models
{
    public class RegisterModel
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public DateOnly DoB { get; set; }
        [RegularExpression("[0-9]{10}")]
        public string Phone { get; set; } = string.Empty;
        public string? Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required]
        public string IdentiticationNumber { get; set; } = string.Empty;
    }
}
