using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RealEstateBackEnd.Models
{
    public class Plan
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        [MaxLength(20)]
        public string Area { get; set; } = string.Empty;
        public string Address { get; set; } = String.Empty;
        public string Link { get; set; } = String.Empty;
        public IList<string> Design { get; set; } = new List<string>();
        public string Legality { get; set; } = String.Empty;
        public IList<string> Imageurl { get; set; } = new List<string>();
        public IList<string> Description { get; set; } = new List<string>();
        public string Type { get; set; } = string.Empty;
        public string Status { get; set; } = String.Empty;
        public IList<string> Progress { get; set; } = new List<string>();
        public ICollection<RealEstate> realEstates { get; set; } = new List<RealEstate>();

        [ForeignKey("Seller")]
        public int SellerId { get; set; }
        public Seller? Seller { get; set; } = null!;
    }
}
