using API.DTOs.Account;

namespace API.Services.AuthService
{
    public interface IAccountService
    {
        Task<GetUserDTO> LogUserInAsync(LogInUserDTO login);
        Task<GetUserDTO?> RegisterUserAsync(RegisterUserDTO userDTO);
    }
}