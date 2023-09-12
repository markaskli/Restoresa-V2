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
    public class ReservationsController : BaseAPIController
    {
        private readonly StoreContext _context;
        public ReservationsController(StoreContext context)
        {
            _context =  context;
        }

        
        [HttpGet("restaurantId")]
        public async Task<ActionResult<List<ReservationTime>>> GetReservationTimesOfRestaurant(int id)
        {
             var times = await _context.AvailableTimes.Where(x => x.RestaurantId == id).ToListAsync();
             return Ok(times);
        }

        
        [HttpPost]
        public async Task<ActionResult> AddReservationTime(int restaurantId, int hour, int minute) 
        {
            var restaurant = await _context.Restaurants.FirstOrDefaultAsync(x => x.RestaurantId == restaurantId);
            if (restaurant == null) 
            {
                return NotFound();
            }


            var theTime = new TimeOnly(hour, minute);

            ReservationTime reservation = new ReservationTime{
                Time = theTime
            };

            restaurant.ReservationTimes.Add(reservation);
            var result = await _context.SaveChangesAsync() > 0;
            if (result) return Ok();
            return BadRequest(new ProblemDetails { Title = "Error while trying to save reservation time"});

        }
    }
}