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
        public required string ReservedDate { get; set; }
        public required string ReservedTime { get; set; }
        public required int Seats { get; set; }
        public string? ClientSecret { get; set; }
        public string? PaymentIntentId { get; set; }
        public List<BasketItemDTO> Items { get; set; }
        public RestaurantCardDTO Restaurant { get; set; } = null!;

        public BasketDTO() 
        {
            Items = new List<BasketItemDTO>();
        }
    }
}