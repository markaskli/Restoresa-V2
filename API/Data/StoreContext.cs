using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User>
    {
        private readonly IConfiguration _configuration;
        public StoreContext(DbContextOptions<StoreContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<Restaurant> Restaurants { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Basket> Baskets { get; set; }
        public DbSet<Reservation> Reservations { get; set; }
        public DbSet<WorkingHours> WorkingHours { get; set; }
        public DbSet<TimeSlot> TimeSlots { get; set; }
        public DbSet<OrderItem> OrderedItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>()
            {
                new IdentityRole()
                {
                    Id = "fbb29775-29da-48ba-a123-527141dd2c0e",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole()
                {
                    Id = "e5bb09c7-740e-4a1c-a4aa-f048d5f7ef4d",
                    Name = "Customer",
                    NormalizedName = "CUSTOMER"
                },
                new IdentityRole()
                {
                    Id = "7b3c06a2-3320-442d-a3c5-96fbfff8e896",
                    Name = "Restaurant-Employee",
                    NormalizedName = "RESTAURANT-EMPLOYEE"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}