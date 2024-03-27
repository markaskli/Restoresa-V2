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
        private readonly HttpContext _httpContext;
        private readonly ITokenService _tokenService;
        private readonly IBasketService _basketService;
        private readonly string _cookieName = Constants.CookieName;
        

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService, IBasketService basketService, IHttpContextAccessor httpContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _basketService = basketService;
            _httpContext = httpContext.HttpContext;
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

        public async Task<GetUserDTO> LogUserIn(LogInUserDTO login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, login.Password))
            {
                throw new UnauthorizedAccessException("Wrong details were provided.");
            }


            await _basketService.AssignBasketToUser(user.Id);
            return new GetUserDTO()
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Surname = user.Surname,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}
