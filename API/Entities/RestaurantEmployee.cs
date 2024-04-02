using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class RestaurantEmployee : User
    {
        public virtual ICollection<Restaurant> Restaurants { get; set; } 
        public RestaurantEmployee()
        {
            Restaurants = new List<Restaurant>();
        }
    }
}
