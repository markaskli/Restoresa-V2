﻿using API.DTOs.Basket;
using API.DTOs.Reservation;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Services.BasketService
{
    public interface IBasketService
    {
        Task<BasketDTO?> AddItemToBasket(int productId, int quantity, int restaurantId, string userId);
        Task AddReservationDetails(ReservationDetailsDTO reservationDetails, string userId);
        Task<BasketDTO?> AssignBasketToUser(string userId);
        Task<ActionResult<BasketDTO>?> GetBasket(string userId);
        Task<bool> RemoveItemFromBasket(int productId, int quantity, string userId);
        Task<Basket?> RetrieveBasket(string userId);
    }
}
