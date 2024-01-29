﻿namespace API.DTOs
{
    public class CreateRestaurantDTO
    {
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string PictureUrl { get; set; }
        public required string Description { get; set; }

    }
}
