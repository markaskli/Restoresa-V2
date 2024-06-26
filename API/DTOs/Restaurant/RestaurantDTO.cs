﻿using API.DTOs.Product;
using API.DTOs.Restaurant.WorkingHours;
using API.Entities;

namespace API.DTOs.Restaurant
{
    public class RestaurantDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string PictureUrl { get; set; }
        public required string Description { get; set; }
        public required int MaxPeopleServedPerTable { get; set; }
        public List<ProductDTO> Products { get; set; }
        public List<WorkingHoursDTO> WorkingHours { get; set; }

        public RestaurantDTO()
        {
            Products = new List<ProductDTO>();
            WorkingHours = new List<WorkingHoursDTO>();
        }
    }
}
