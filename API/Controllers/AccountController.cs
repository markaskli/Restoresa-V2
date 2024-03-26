using API.DTOs.Account;
using API.Services.AuthService;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ActionResult> Register(RegisterUserDTO request)
        {
            try
            {
                var user = await _accountService.RegisterCustomerAsync(request);
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
    }
}
