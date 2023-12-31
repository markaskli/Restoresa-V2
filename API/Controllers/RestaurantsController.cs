using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class RestaurantsController : BaseAPIController
    {
        private readonly StoreContext _context;

        public RestaurantsController(StoreContext context)
        {
            _context = context;            
        }

        [HttpGet]
        public async Task<ActionResult<List<Restaurant>>> GetRestaurants() 
        {
            return await _context.Restaurants.Include(rest => rest.Products).ToListAsync();
        }  

        [HttpGet("{id}")]
        public async Task<ActionResult<Restaurant>> GetIndividualRestaurant(int id)
        {
            var restaurant = await _context.Restaurants
                .FirstOrDefaultAsync(x => x.RestaurantId == id);

            if (restaurant == null) 
            {
                return NotFound();
            }

            return Ok(restaurant);

        }



    }
}