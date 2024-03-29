using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class User : IdentityUser
    {
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }

        public User()
        {
            Reservations = new List<Reservation>();
        }



    }
}
