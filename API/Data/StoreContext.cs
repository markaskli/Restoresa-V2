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
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
            
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
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole()
                {
                    Name = "Customer",
                    NormalizedName = "CUSTOMER"
                },
                new IdentityRole()
                {
                    Name = "Restaurant-Employee",
                    NormalizedName = "RESTAURANT-EMPLOYEE"
                }
            };

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}