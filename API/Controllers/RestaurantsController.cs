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
            return await _context.Restaurants.ToListAsync();
        }  
    }
}