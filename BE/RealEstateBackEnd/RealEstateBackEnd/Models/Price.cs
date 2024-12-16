using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace RealEstateBackEnd.Models
{
    public class Price
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal PriceValue { get; set; }
        public DateOnly DateCreated { get; set; }

        [ForeignKey(nameof(RealEstate))]
        public int RealEstateId { get; set; }
        public RealEstate RealEstate { get; set; } = null!;
    }
}
