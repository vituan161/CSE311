using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace RealEstateBackEnd.Models
{
    public class AppUser:IdentityUser<int>
    {
        public bool IsOfficial { get; set; }
        public Profile Profile { get; set; } = null!;
        public Follow Follow { get; set; } = null!;
        public Role Role { get; set; } = Role.User;
    }

    public enum Role
    {
        Admin, User
    }
}
