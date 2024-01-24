using API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.BasketService
{
    public interface IBasketService
    {
        Task<bool> AddItemToBasket(int productId, int quantity, int restaurantId);
        Task<ActionResult<BasketDTO>?> GetBasket();
        Task<bool> RemoveItemFromBasket(int productId, int quantity);
    }
}
