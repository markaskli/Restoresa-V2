using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Account
{
    public class LogInUserDTO
    {
        [EmailAddress]
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
