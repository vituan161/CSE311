using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace RealEstateBackEnd.Models
{
    public class AppUser:IdentityUser<int>
    {
        public bool IsOfficial { get; set; }
        [ForeignKey(nameof(Profile))]
        public int ProfileId { get; set; }
        public Profile Profile { get; set; } = null!;
        [ForeignKey(nameof(Follow))]
        public int FollowId { get; set; }
        public Follow Follow { get; set; } = null!;
        public Role Role { get; set; } = Role.User;
    }

    public enum Role
    {
        Admin, User
    }
}
