using API.DTOs;
using API.DTOs.Account;
using API.Entities;
using API.Services.BasketService;
using API.Services.TokenService;
using API.Utils;
using Microsoft.AspNetCore.Identity;

namespace API.Services.AuthService
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IBasketService _basketService;
        private readonly string _cookieName = Constants.CookieName;
        

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IBasketService basketService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _basketService = basketService;
        }

        public async Task<GetUserDTO?> RegisterUserAsync(RegisterUserDTO userDTO)
        {
            var newUser = new User()
            {
                UserName = userDTO.Username,
                Name = userDTO.Name,
                Surname = userDTO.Surname,
                PhoneNumber = userDTO.PhoneNumber,
                Email = userDTO.Email
            };

            var createdUser = await _userManager.CreateAsync(newUser, userDTO.Password);
            if (createdUser.Succeeded)
            {
                var userRole = string.Empty;
                if (userDTO.IsEmployee)
                {
                    userRole = "Restaurant-Employee";
                }
                else
                {
                    userRole = "Customer";
                }

                var roleResult = await _userManager.AddToRoleAsync(newUser, userRole);

                if (roleResult.Succeeded)
                {
                    return new GetUserDTO()
                    {
                        Id = newUser.Id,
                        Name = newUser.Name,
                        Surname = newUser.Surname,
                        Email = newUser.Email,
                        Role = userRole,
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

        public async Task<GetUserDTO> LogUserInAsync(LogInUserDTO login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, login.Password))
            {
                throw new UnauthorizedAccessException("Wrong details were provided.");
            }


            await _basketService.AssignBasketToUser(user.Id);
            var userRoles = await _userManager.GetRolesAsync(user);
            return new GetUserDTO()
            {
                Id = user.Id,
                Email = user.Email!,
                Name = user.Name,
                Surname = user.Surname,
                Role = userRoles[0],
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}
