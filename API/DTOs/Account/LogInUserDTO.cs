using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Account
{
    public class LogInUserDTO
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
