using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Restaurant
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string PictureUrl { get; set; }
        public required string Description { get; set; }
        public int MaxPeopleServedPerTable { get; set; }
        public virtual ICollection<Product> Products { get; set; } 
        public virtual ICollection<WorkingHours> WorkingHours { get; set; } 
        public virtual string OwnerId { get; set; } = null!;
        public virtual RestaurantEmployee Owner { get; set; } = null!;


        public Restaurant()
        {
            Products = new List<Product>();
            WorkingHours = new List<WorkingHours>();
        }

    }
}