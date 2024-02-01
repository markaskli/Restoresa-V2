using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Services.BasketService
{
    public class BasketService : IBasketService
    {
        private readonly StoreContext _storeContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public BasketService(StoreContext storeContext, IHttpContextAccessor httpContextAccessor)
        {
            _storeContext = storeContext;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<ActionResult<BasketDTO>?> GetBasket()
        {
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                return null;
            }
            return basket.MapBasketToDTO();
        }

        public async Task<bool> AddItemToBasket(int productId, int quantity, int restaurantId)
        {
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                basket = CreateBasket();
            }

            var product = await _storeContext.Products.FindAsync(productId);
            if (product == null)
            {
                throw new KeyNotFoundException($"Expected product for key {productId} not found.");
            }

            basket.AddItem(product, quantity);
            basket.RestaurantId = restaurantId;
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
            {
                return true;
            }
            else
            {
                throw new DbUpdateException("Problem occurred while trying to save changes to the basket.");
            }

        }

        public async Task<bool> RemoveItemFromBasket(int productId, int quantity)
        {
            var basket = await RetrieveBasket();
            if (basket == null)
            {
                return false;
            }

            basket.RemoveItem(productId, quantity);
            var changes = await _storeContext.SaveChangesAsync() > 0;
            if (changes)
            {
                return true;
            }
            else
            {
                throw new DbUpdateException("Problem occurred while trying to save changes to the basket.");
            }

        }

        private async Task<Basket> RetrieveBasket()
        {
            return await _storeContext.Baskets
                       .Include(b => b.Restaurant)
                       .Include(i => i.Items)
                       .ThenInclude(p => p.Product)
                       .FirstOrDefaultAsync(basket => basket.ClientId == _httpContextAccessor.HttpContext.Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            _httpContextAccessor.HttpContext.Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { ClientId = buyerId };
            _storeContext.Baskets.Add(basket);
            return basket;
        }


    }
}
