using API.DTOs;
using API.DTOs.Account;
using API.Entities;
using API.Services.TokenService;
using Microsoft.AspNetCore.Identity;

namespace API.Services.AuthService
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly ITokenService _tokenService;

        public AccountService(UserManager<User> userManager, ITokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        public async Task<GetUserDTO?> RegisterCustomerAsync(RegisterUserDTO customer)
        {
            var newUser = new User()
            {
                UserName = customer.Username,
                Name = customer.Name,
                Surname = customer.Surname,
                PhoneNumber = customer.PhoneNumber,
                Email = customer.Email
            };

            var createdUser = await _userManager.CreateAsync(newUser, customer.Password);
            if (createdUser.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(newUser, "Customer");
                if (roleResult.Succeeded)
                {
                    return new GetUserDTO()
                    {
                        Id = newUser.Id,
                        Name = newUser.Name,
                        Surname = newUser.Surname,
                        Email = newUser.Email,
                        Token = _tokenService.CreateToken(newUser)
                    };
                }
                else
                {
                    var errors = string.Join(", ", roleResult.Errors.Select(x => x.Description));
                    throw new ArgumentException(errors);
                }
            }
            else
            {
                var errors = string.Join(", ", createdUser.Errors.Select(x => x.Description));
                throw new ArgumentException(errors);
            }
        }
    }
}
