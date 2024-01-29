using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.EntityFrameworkCore;

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
                    WeekDay = wh.WeekDay,
                    TimeSlots = wh.TimeSlots.Select(ts => new TimeSlotDTO()
                    {
                        StartTime = ts.StartTime,
                        EndTime = ts.EndTime,
                        Available = ts.Available,
                    }).ToList(),
                }).ToList(),
            }).ToList();
        }

        public async Task<RestaurantDTO?> GetRestaurant(int restaurantId)
        {
            var restaurant = await _storeContext.Restaurants.Include(rest => rest.Products).Include(rest => rest.WorkingHours).SingleOrDefaultAsync(rest => rest.Id == restaurantId);
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

        //public async Task<RestaurantDTO> AddTimeSlots(List<CreateTimeSlotDTO> timeSlotDTOs)
        //{

        //}

    }
}
