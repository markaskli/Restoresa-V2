using API.DTOs;
using API.Services.PaymentService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost]
        public async Task<ActionResult<BasketDTO>> ManipulatePaymentIntent()
        {
            try
            {
                var basket = await _paymentService.CreateOrUpdatePaymentIntent();
                if (basket == null)
                {
                    return NotFound();
                }
                return Ok(basket);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           

        }

        [HttpPost("webhook")]
        public async Task<ActionResult> Post()
        {
            try
            {
                var result = await _paymentService.Webhook();
                if (result == false)
                {
                    return BadRequest();
                }

                return Ok();


            }
            catch (StripeException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
            
        }
    }
}
