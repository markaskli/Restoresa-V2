using API.DTOs.Restaurant;
using API.DTOs.Restaurant.WorkingHours;

namespace API.Services.RestaurantService
{
    public interface IRestaurantService
    {
        Task<RestaurantDTO> AddRestaurant(CreateRestaurantDTO restaurantDTO);
        Task<RestaurantDTO> AddTimeSlots(int restaurantId, string weekday, CreateTimeSlotDTO timeSlotDTOs);
        Task<RestaurantDTO?> GetRestaurant(int restaurantId);
        Task<List<RestaurantDTO>?> GetRestaurantsOfEmployee(string userId);
        Task<List<RestaurantsListDTO>?> GetRestaurants();
        Task<List<TimeSlotDTO>?> GetTimeSlots(int restaurantId, string weekDay);
        Task<bool> RemoveRestaurant(int restaurantId);
    }
}