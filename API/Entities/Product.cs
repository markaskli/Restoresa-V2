using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    [Table("Products")]
    public class Product
    {
        public int Id { get; set; }
        public required string Type { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public required string ImageUrl { get; set; }


        // navigation properties
        public int RestaurantId { get; set; }
        
    }
}