using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.BasketService
{
    public interface IBasketService
    {
        Task<BasketDTO> AddItemToBasket(int productId, int quantity, int restaurantId);
        Task AddReservationDetails(ReservationDetailsDTO reservationDetails);
        Task<ActionResult<BasketDTO>?> GetBasket();
        Task<bool> RemoveItemFromBasket(int productId, int quantity);
    }
}
