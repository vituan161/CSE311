using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;

namespace RealEstateBackEnd.Models
{
    public class RealEstate
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Area { get; set; } = String.Empty;
        public string Address { get; set; } = String.Empty;
        public string Link { get; set; } = String.Empty;
        public IList<string> Imageurl { get; set; } = new List<string>();
        public IList<string> Description { get; set; } = new List<string>();
        public IList<string> Design { get; set; } = new List<string>();
        public string Legality { get; set; } = String.Empty;
        public RealEstateType Type { get; set; }
        public DateOnly DateCreated { get; set; }
        public DateOnly DateExprired { get; set; }
        public string Status { get; set; } = String.Empty;
        public ICollection<Price> Prices { get; set; } = new List<Price>();

        [ForeignKey(nameof(Plan))]
        public int? PlanId { get; set; }
        public Plan? Plan { get; set; }

        [ForeignKey(nameof(Seller))]
        public int SellerId { get; set; }
        public Seller Seller { get; set; } = null!;
    }

    public enum RealEstateType
    {
        Apartment,
        House,
        Land
    }
}
