using API.DTOs;

namespace API.Services.RestaurantService
{
    public interface IRestaurantService
    {
        Task<RestaurantDTO> AddRestaurant(CreateRestaurantDTO restaurantDTO);
        Task<RestaurantDTO?> GetRestaurant(int restaurantId);
        Task<List<RestaurantDTO>?> GetRestaurants();
        Task<bool> RemoveRestaurant(int restaurantId);
    }
}