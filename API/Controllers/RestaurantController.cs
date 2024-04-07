using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs.Restaurant;
using API.DTOs.Restaurant.WorkingHours;
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

        [HttpGet("{id}", Name = "GetRestaurant")]
        public async Task<ActionResult<Restaurant>> Get(int id)
        {
            var restaurant = await _restaurantService.GetRestaurant(id);
            if (restaurant == null) 
            {
                return NotFound();
            }

            return Ok(restaurant);

        }

        [HttpGet("user")]
        public async Task<ActionResult> GetRestaurantsOfUser(string userId)
        {
            var restaurants = await _restaurantService.GetRestaurantsOfEmployee(userId);
            if (restaurants == null)
            {
                return NotFound();
            }

            return Ok(restaurants);

        }

        [HttpGet("timeslots")]
        public async Task<ActionResult<List<TimeSlotDTO>>> GetTimeSlots(int id, string weekDay) // PAKEISTI
        {
            try
            {
                var result = await _restaurantService.GetTimeSlots(id, weekDay);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create(CreateRestaurantDTO restaurantDTO)
        {
            var restaurant = await _restaurantService.AddRestaurant(restaurantDTO);
            return CreatedAtRoute("GetRestaurant", new { id = restaurant.Id }, restaurant);
        }

        [HttpPost("addSlots")]
        public async Task<ActionResult<RestaurantDTO>> CreateTimeSlots(int id, string weekday, CreateTimeSlotDTO slotsDTO)
        {
            try
            {
                var restaurant = await _restaurantService.AddTimeSlots(id, weekday, slotsDTO);
                return Ok(restaurant);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(int restaurantId)
        {
            try 
            {
                var result = await _restaurantService.RemoveRestaurant(restaurantId);
                if (result) 
                {
                    return StatusCode(204);
                }
                else 
                {
                    return BadRequest("Problem occurred while trying to delete the restaurant.");
                }
            }
            catch (KeyNotFoundException ex) 
            {
                return NotFound(ex.Message);
            }          
        }

    }
}