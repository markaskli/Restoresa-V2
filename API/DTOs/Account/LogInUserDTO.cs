using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Account
{
    public class LogInUserDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}
