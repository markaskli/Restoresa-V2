using API.DTOs;

namespace API.Services.RestaurantService
{
    public interface IRestaurantService
    {
        Task<RestaurantDTO> AddRestaurant(CreateRestaurantDTO restaurantDTO);
        Task<RestaurantDTO> AddTimeSlots(int restaurantId, string weekday, CreateTimeSlotDTO timeSlotDTOs);
        Task<RestaurantDTO?> GetRestaurant(int restaurantId);
        Task<List<RestaurantDTO>?> GetRestaurants();
        Task<List<TimeSlotDTO>?> GetTimeSlots(int restaurantId, string weekDay);
        Task<bool> RemoveRestaurant(int restaurantId);
    }
}