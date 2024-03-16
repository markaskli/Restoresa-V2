using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RestaurantsListDTO
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string PictureUrl { get; set; }
        public required string Description { get; set; }
        public required int MaxPeopleServedPerTable { get; set; }
    }
}