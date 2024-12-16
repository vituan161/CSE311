using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using RealEstateBackEnd.Models;
using Microsoft.AspNetCore.Identity;
using Humanizer;

namespace RealEstateBackEnd.Data
{
    public class RealEstateBackEndContext : IdentityDbContext<AppUser, IdentityRole<int>, int>
    {
        public RealEstateBackEndContext (DbContextOptions<RealEstateBackEndContext> options)
            : base(options)
        {
        }

        public DbSet<RealEstateBackEnd.Models.AppUser> AppUser { get; set; } = default!;
        public DbSet<RealEstateBackEnd.Models.Company> Company { get; set; } = default!;
        public DbSet<RealEstateBackEnd.Models.RealEstate> RealEstate { get; set; } = default!;
        public DbSet<RealEstateBackEnd.Models.Plan> Plan { get; set; } = default!;
        public DbSet<RealEstateBackEnd.Models.News> News { get; set; } = default!;
        public DbSet<RealEstateBackEnd.Models.Profile> Profile { get; set; } = default!;
        public DbSet<RealEstateBackEnd.Models.Follow> Follow { get; set; } = default!;
        public DbSet<RealEstateBackEnd.Models.Price> Price { get; set; } = default!;
        public DbSet<RealEstateBackEnd.Models.Seller> Seller { get; set; } = default!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AppUser>()
                .HasOne(a => a.Profile)
                .WithOne(p => p.AppUser)
                .HasForeignKey<Profile>(p => p.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AppUser>()
                .HasOne(a => a.Follow)
                .WithOne(f => f.AppUser)
                .HasForeignKey<Follow>(f => f.AppUserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure many - to - many relationship between Follow and Profile for Followers
            modelBuilder.Entity<Follow>()
                .HasMany(f => f.Followers)
                .WithMany()
                .UsingEntity<Dictionary<string, object>>(
                    "ProfileFollower",
                    j => j
                        .HasOne<Profile>()
                        .WithMany()
                        .HasForeignKey("FollowerId")
                        .OnDelete(DeleteBehavior.Restrict),
                    j => j
                        .HasOne<Follow>()
                        .WithMany()
                        .HasForeignKey("FollowId")
                        .OnDelete(DeleteBehavior.Cascade));

            // Configure many-to-many relationship between Follow and Profile for Following
            modelBuilder.Entity<Follow>()
                .HasMany(f => f.Following)
                .WithMany()
                .UsingEntity<Dictionary<string, object>>(
                    "ProfileFollowing",
                    j => j
                        .HasOne<Profile>()
                        .WithMany()
                        .HasForeignKey("FollowingId")
                        .OnDelete(DeleteBehavior.Restrict),
                    j => j
                        .HasOne<Follow>()
                        .WithMany()
                        .HasForeignKey("FollowId")
                        .OnDelete(DeleteBehavior.Cascade));
        }
    }
}
