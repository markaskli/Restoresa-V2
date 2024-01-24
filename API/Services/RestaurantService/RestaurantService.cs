using API.Data;
using API.DTOs;
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
                    ImageUrl = prod.ImageUrl
                }).ToList(),
                WorkingHours = rest.WorkingHours.Select(wh => new WorkingHoursDTO()
                {
                    Id = wh.Id,
                    WeekDay = wh.WeekDay,
                    OpenTime = wh.OpenTime,
                    CloseTime = wh.CloseTime,
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

            return new RestaurantDTO()
            {
                Id = restaurant.Id,
                Name = restaurant.Name,
                Address = restaurant.Address,
                PictureUrl = restaurant.PictureUrl,
                Description = restaurant.Description,
                Products = restaurant.Products.Select(prod => new ProductDTO()
                {
                    Id = prod.Id,
                    Type = prod.Type,
                    Title = prod.Title,
                    Description = prod.Description,
                    Price = prod.Price,
                    ImageUrl = prod.ImageUrl
                }).ToList(),
                WorkingHours = restaurant.WorkingHours.Select(wh => new WorkingHoursDTO()
                {
                    Id = wh.Id,
                    WeekDay = wh.WeekDay,
                    OpenTime = wh.OpenTime,
                    CloseTime = wh.CloseTime,
                }).ToList(),
            };
        }



    }
}
