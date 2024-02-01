using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class BasketDTO
    {
        public int Id { get; set; }
        public required string BuyerId { get; set; }
        public List<BasketItemDTO> Items { get; set; }
        public RestaurantCardDTO Restaurant { get; set; } = null!;

        public BasketDTO() 
        {
            Items = new List<BasketItemDTO>();
        }
    }
}