using API.DTOs;

namespace API.Services.RestaurantService
{
    public interface IRestaurantService
    {
        Task<RestaurantDTO?> GetRestaurant(int restaurantId);
        Task<List<RestaurantDTO>?> GetRestaurants();
    }
}