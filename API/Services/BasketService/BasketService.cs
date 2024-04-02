using API.Data;
using API.DTOs.Basket;
using API.DTOs.Reservation;
using API.Entities;
using API.Extensions;
using API.Services.AuthService;
using API.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace API.Services.BasketService
{
    public class BasketService : IBasketService
    {
        private readonly StoreContext _storeContext;
        private readonly HttpContext _httpContext;
        private readonly string _cookieName = Constants.CookieName;

        public BasketService(StoreContext storeContext, IHttpContextAccessor httpContextAccessor)
        {
            _storeContext = storeContext;
            _httpContext = httpContextAccessor.HttpContext;
        }

        public async Task<ActionResult<BasketDTO>?> GetBasket(string userId)
        {
            var basket = await RetrieveBasket(userId);
            if (basket == null)
            {
                return null;
            }
            return basket.MapBasketToDTO();
        }

        public async Task<BasketDTO?> AddItemToBasket(int productId, int quantity, int restaurantId, string userId)
        {
            var basket = await RetrieveBasket(userId);
            if (basket == null)
            {
                return null;
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
                return basket.MapBasketToDTO();
            }
            else
            {
                throw new DbUpdateException("Problem occurred while trying to save changes to the basket.");
            }

        }

        public async Task<bool> RemoveItemFromBasket(int productId, int quantity, string userId)
        {
            var basket = await RetrieveBasket(userId);
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

        public async Task AddReservationDetails(ReservationDetailsDTO reservationDetails, string userId)
        {
            if (reservationDetails == null)
            {
                throw new ArgumentNullException("No detais were provided");
            }

            var basket = await RetrieveBasket(userId);
            if (basket == null)
            {
                basket = CreateBasket();
            }

            if(reservationDetails.Seats <= 0)
            {
                throw new ArgumentException("Number of reserved seats can not be lower or equal to zero.");
            }

            DateTime reservationDate;
            if (!DateTime.TryParse(reservationDetails.ReservedDate, out reservationDate))
            {
                throw new FormatException();
            }

            TimeSpan reservedTimeSlot;
            if (!TimeSpan.TryParseExact(reservationDetails.ReservedTime, @"hh\:mm", CultureInfo.CurrentCulture, out reservedTimeSlot))
            {
                throw new FormatException();

            }

            basket.Seats = reservationDetails.Seats;
            basket.ReservedTime = reservedTimeSlot;
            basket.ReservedDate = reservationDate;
            basket.RestaurantId = reservationDetails.RestaurantId;

            try
            {
                await _storeContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("An error occurred while trying to save data", ex);
            }
            
        }

        public async Task<BasketDTO?> AssignBasketToUser(string userId)
        {
            var userBasket = await RetrieveBasket(userId);
            var anonBasket = await RetrieveBasket(_httpContext.Request.Cookies[_cookieName]);

            if (anonBasket != null)
            {
                if (userBasket != null)
                {
                    _storeContext.Baskets.Remove(userBasket);
                }

                anonBasket.ClientId = userId;
                _httpContext.Response.Cookies.Delete(_cookieName);
                var result = await _storeContext.SaveChangesAsync() > 0;
                return anonBasket.MapBasketToDTO();
            }

            return null;
        }


        public async Task<Basket?> RetrieveBasket(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                _httpContext.Response.Cookies.Delete(_cookieName);
                return null;

            }

            return await _storeContext.Baskets
                       .Include(b => b.Restaurant)
                       .Include(i => i.Items)
                       .ThenInclude(p => p.Product)
                       .FirstOrDefaultAsync(basket => basket.ClientId == userId);
        }


        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            _httpContext.Response.Cookies.Append(_cookieName, buyerId, cookieOptions);
            var basket = new Basket { ClientId = buyerId };
            _storeContext.Baskets.Add(basket);
            return basket;
        }


    }
}
