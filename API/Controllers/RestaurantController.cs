using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Services.RestaurantService;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RestaurantController : ControllerBase
    {
        private readonly IRestaurantService _restaurantService;

        public RestaurantController(IRestaurantService restaurantService)
        {
            _restaurantService = restaurantService;            
        }

        [HttpGet]
        public async Task<ActionResult<List<RestaurantDTO>>> Get() 
        {
            var restaurants = await _restaurantService.GetRestaurants();
            if (restaurants == null)
            {
                return NotFound();
            }
            return Ok(restaurants);
        }  

        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> Get(int id)
        {
            var restaurant = await _restaurantService.GetRestaurant(id);
            if (restaurant == null) 
            {
                return NotFound();
            }

            return Ok(restaurant);

        }

    }
}