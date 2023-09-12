using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class ReservationTime
    {
        public int Id { get; set; }
    
        public TimeOnly Time { get; set; } 
        
        public int RestaurantId { get; set; }
        public Restaurant Restaurant { get; set; }

    }
}