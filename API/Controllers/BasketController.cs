using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Services.BasketService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BasketController : ControllerBase
    {
        private readonly IBasketService _basketService;

        public BasketController(IBasketService basketService) 
        {
            _basketService = basketService;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDTO>> Get()
        {
            var basket = await _basketService.GetBasket();
            if (basket == null)
            {
                return NotFound();
            }
            return basket;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity, int restaurantId) 
        {
            try
            {
                var status = await _basketService.AddItemToBasket(productId, quantity, restaurantId);
                return Ok();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(ex.Message);
            }
            

        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quantity)
        {
            try
            {
                var status = await _basketService.RemoveItemFromBasket(productId, quantity);
                if (status == false)
                {
                    return NotFound("Basket not found");
                }
                return Ok();
            }
            catch (DbUpdateException ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("addDetails")]
        public async Task<ActionResult> AddReservationDetailsToBasket(ReservationDetailsDTO reservationDetails)
        {
            try
            {
                await _basketService.AddReservationDetails(reservationDetails);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}