﻿namespace API.DTOs.Restaurant
{
    public class RestaurantCardDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string PictureUrl { get; set; }
        public required string Description { get; set; }
    }
}
