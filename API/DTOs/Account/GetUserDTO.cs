
using API.DTOs.Basket;
using API.Entities;

namespace API.DTOs.Account
{
    public class GetUserDTO
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string Surname { get; set; }
        public required string Username { get; set; }

        public required string Email { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Role { get; set; }
        public required string Token { get; set; }
        public BasketDTO? Basket {get; set;}

    }
}
