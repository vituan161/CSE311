using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RealEstateBackEnd.Models
{
    public class Follow
    {
        [Key]
        public int Id { get; set; }
        public ICollection<Profile> Followers { get; set; } = new List<Profile>();
        public ICollection<Profile> Following { get; set; } = new List<Profile>();
        [ForeignKey(nameof(AppUser))]
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; } = null!;
    }
}
