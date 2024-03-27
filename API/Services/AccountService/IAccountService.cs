using API.DTOs.Account;

namespace API.Services.AuthService
{
    public interface IAccountService
    {
        Task<GetUserDTO> LogUserIn(LogInUserDTO login);
        Task<GetUserDTO?> RegisterCustomerAsync(RegisterUserDTO customer);
    }
}