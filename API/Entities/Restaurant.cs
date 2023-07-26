using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Restaurant
    {
        public int RestaurantId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PictureUrl { get; set; }
        public string Description { get; set; }
        public List<Product> Products{ get; set; } = new List<Product>();
        

    }
}