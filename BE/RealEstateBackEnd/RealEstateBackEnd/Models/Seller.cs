using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;
using System.Xml;

namespace RealEstateBackEnd.Models
{
    public class Seller
    {
        public int Id { get; set; }

        [ForeignKey(nameof(User))]
        public int UserId { get; set; }
        public AppUser User { get; set; } = null!;

        [ForeignKey(nameof(AgencyCompany))]
        public int? AgencyCompanyId { get; set; }
        public Company? AgencyCompany { get; set; }
        public ICollection<RealEstate> RealEstates { get; set; } = new List<RealEstate>();
        public ICollection<Plan> Plans { get; set; } = new List<Plan>();
    }
}
