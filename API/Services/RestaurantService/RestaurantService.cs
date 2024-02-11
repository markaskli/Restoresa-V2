using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Cryptography;

namespace API.Services.RestaurantService
{
    public class RestaurantService : IRestaurantService
    {
        private readonly StoreContext _storeContext;

        public RestaurantService(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<List<RestaurantDTO>?> GetRestaurants()
        {
            var restaurants = await _storeContext.Restaurants.Include(rest => rest.Products).Include(rest => rest.WorkingHours).ToListAsync();
            if (!restaurants.Any())
            {
                return null;
            }

            return restaurants.Select(rest => new RestaurantDTO()
            {
                Id = rest.Id,
                Name = rest.Name,
                Address = rest.Address,
                PictureUrl = rest.PictureUrl,
                Description = rest.Description,
                MaxPeopleServedPerTable = rest.MaxPeopleServedPerTable,
                Products = rest.Products.Select(prod => new ProductDTO()
                {
                    Id = prod.Id,
                    Type = prod.Type,
                    Title = prod.Title,
                    Description = prod.Description,
                    Price = prod.Price,
                    ImageUrl = prod.ImageUrl,
                    RestaurantId = prod.RestaurantId
                }).ToList(),
                WorkingHours = rest.WorkingHours.Select(wh => new WorkingHoursDTO()
                {
                    Id = wh.Id,
                    WeekDay = wh.Weekday.ToString(),
                    StartTime = wh.StartTime.ToString(@"hh\:mm"),
                    FinishTime = wh.FinishTime.ToString(@"hh\:mm"),
                    TimeSlots = wh.TimeSlots.Select(ts => new TimeSlotDTO()
                    {
                        StartTime = ts.StartTime.ToString(@"hh\:mm"),
                        Available = ts.Available,
                    }).ToList(),
                }).ToList(),
            }).ToList();
        }

        public async Task<RestaurantDTO?> GetRestaurant(int restaurantId)
        {
            var restaurant = await _storeContext.Restaurants.Include(rest => rest.Products).Include(rest => rest.WorkingHours).ThenInclude(wh => wh.TimeSlots).SingleOrDefaultAsync(rest => rest.Id == restaurantId);
            if (restaurant == null)
            {
                return null;
            }

            return restaurant.MapToDTO();
        }

        public async Task<RestaurantDTO> AddRestaurant(CreateRestaurantDTO restaurantDTO)
        {
            var restaurant = new Restaurant()
            {
                Name = restaurantDTO.Name,
                Address = restaurantDTO.Address,
                PictureUrl = restaurantDTO.PictureUrl,
                Description = restaurantDTO.Description,
                MaxPeopleServedPerTable = restaurantDTO.MaxPeopleServedPerTable,
                WorkingHours = restaurantDTO.WorkingHours
                .Select(wh => new WorkingHours()
                {
                    Weekday = wh.WeekDay,
                    StartTime = TimeSpan.Parse(wh.StartTime),
                    FinishTime = TimeSpan.Parse(wh.FinishTime),
                }).ToList()
            };

            await _storeContext.Restaurants.AddAsync(restaurant);
            await _storeContext.SaveChangesAsync();
            return restaurant.MapToDTO();

        }

        public async Task<bool> RemoveRestaurant(int restaurantId)
        {
            var restaurant = await _storeContext.Restaurants.FindAsync(restaurantId);
            if (restaurant == null)
            {
                throw new KeyNotFoundException($"Restaurant of id {restaurantId} not found");
            }

            _storeContext.Restaurants.Remove(restaurant);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return true;
            }

            return false;
        }

        public async Task<RestaurantDTO> AddTimeSlots(int restaurantId, string weekday, CreateTimeSlotDTO timeSlotDTOs)
        {
            var restaurant = await _storeContext.Restaurants.Include(r => r.WorkingHours).ThenInclude(wh => wh.TimeSlots).Where(r => r.Id == restaurantId).SingleOrDefaultAsync();
            if (restaurant == null)
            {
                throw new KeyNotFoundException($"Restaurant of id {restaurantId} not found");
            }


            var workingHours = restaurant.WorkingHours.Where(x => x.Weekday.ToString().Equals(weekday)).SingleOrDefault();
            if (workingHours == null)
            {
                throw new KeyNotFoundException($"WorkingHours of specified day {weekday} not found");
            }

            TimeSlot tempSlot = new TimeSlot()
            {
                StartTime = TimeSpan.Parse(timeSlotDTOs.StartTime)
            };
            workingHours.TimeSlots.Add(tempSlot);

            _storeContext.TimeSlots.Add(tempSlot);
            await _storeContext.SaveChangesAsync();
            return restaurant.MapToDTO();
        }

        public async Task<List<TimeSlotDTO>?> GetTimeSlots(int restaurantId, string weekDay)
        {
            int dayNumber = (int)Enum.Parse(typeof(DayOfWeek), weekDay);

            var restaurant = await _storeContext.Restaurants.Include(r => r.WorkingHours.Where(wh => (int)wh.Weekday == dayNumber)).ThenInclude(wh => wh.TimeSlots).Where(r => r.Id == restaurantId).SingleOrDefaultAsync();
            if (restaurant == null)
            {
                throw new KeyNotFoundException($"Restaurant of id {restaurantId} not found");
            }

            return restaurant.WorkingHours
                .SelectMany(wh => wh.TimeSlots
                    .Select(ts => new TimeSlotDTO()
                    {
                        Available = ts.Available,
                        StartTime = ts.StartTime.ToString(@"hh\:mm")
                    })
                ).ToList();

        }

    }
}
