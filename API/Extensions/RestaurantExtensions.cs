using API.DTOs;
using API.Entities;

namespace API.Extensions
{
    public static class RestaurantExtensions
    {
        public static RestaurantDTO MapToDTO(this Restaurant restaurant)
        {
            return new RestaurantDTO()
            {
                Id = restaurant.Id,
                Name = restaurant.Name,
                Address = restaurant.Address,
                PictureUrl = restaurant.PictureUrl,
                Description = restaurant.Description,
                MaxPeopleServedPerTable = restaurant.MaxPeopleServedPerTable,
                Products = restaurant.Products.Select(prod => new ProductDTO()
                {
                    Id = prod.Id,
                    Type = prod.Type,
                    Title = prod.Title,
                    Description = prod.Description,
                    Price = prod.Price,
                    ImageUrl = prod.ImageUrl,
                    RestaurantId = restaurant.Id,
                }).ToList(),
                WorkingHours = restaurant.WorkingHours.Select(wh => new WorkingHoursDTO()
                {
                    Id = wh.Id,
                    WeekDay = wh.Weekday.ToString(),   
                    StartTime = wh.StartTime.ToString(@"hh\:mm"),
                    FinishTime = wh.FinishTime.ToString(@"hh\:mm"),
                    TimeSlots = wh.TimeSlots.Select(ts => new TimeSlotDTO()
                    {
                        StartTime = ts.StartTime.ToString(@"hh\:mm"),
                        Available = ts.Available
                    }).ToList(),
                }).ToList(),
            };
        }
    }
}
