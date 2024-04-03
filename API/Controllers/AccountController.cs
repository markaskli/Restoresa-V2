using API.DTOs.Account;
using API.Services.AuthService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterAsync(RegisterUserDTO request)
        {
            try
            {
                var user = await _accountService.RegisterUserAsync(request);
                if (user != null)
                {
                    return Ok(user);
                }
                return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new ProblemDetails() { Detail = ex.Message });
            }

        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUserAsync(LogInUserDTO logIn)
        {
            try
            {
                var result = await _accountService.LogUserInAsync(logIn);
                return Ok(result);
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "A problem occurred while trying to assign the basket");
            }
            catch (ArgumentOutOfRangeException)
            {
                return StatusCode(500, "A problem occurred while trying to get the role of the user.");
            }
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetCurrentUser()
        {
            var user = await _accountService.GetCurrentUser(User.Identity.Name);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
    }
}
