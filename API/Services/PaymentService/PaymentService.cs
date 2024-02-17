using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Services.PaymentService
{
    public class PaymentService : IPaymentService
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly StoreContext _storeContext;

        public PaymentService(IConfiguration configuration, IHttpContextAccessor httpContextAccessor, StoreContext storeContext)
        {
            _configuration = configuration;
            _httpContextAccessor = httpContextAccessor;
            _storeContext = storeContext;
        }

        public async Task<BasketDTO?> CreateOrUpdatePaymentIntent()
        {
            var basket = await _storeContext.Baskets
                .Include(b => b.Restaurant)
                .Include(b => b.Items).ThenInclude(it => it.Product)
                .Where(b => b.ClientId.Equals(_httpContextAccessor.HttpContext.Request.Cookies["buyerId"])).SingleOrDefaultAsync();
            if (basket == null)
            {
                return null;
            }

            StripeConfiguration.ApiKey = _configuration["Stripe:Skey"];

            var service = new PaymentIntentService();
            var intent = new PaymentIntent();
            var subtotal = basket.Items.Sum(it => it.Product.Price * it.Quantity);

            if (string.IsNullOrEmpty(basket.PaymentIntentId))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal,
                    Currency = "eur",
                    PaymentMethodTypes = new List<string> { "card" }
                };

                intent = service.Create(options);
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal
                };

                service.Update(basket.PaymentIntentId, options);
            }

            basket.PaymentIntentId = basket.PaymentIntentId ?? intent.Id;
            basket.ClientSecret = basket.ClientSecret ?? intent.ClientSecret;

            await _storeContext.SaveChangesAsync();

            return basket.MapBasketToDTO();

        }

        public async Task<bool?> Webhook()
        {
            var json = await new StreamReader(_httpContextAccessor.HttpContext.Request.Body).ReadToEndAsync();
            string endpointSecret = _configuration["Stripe:WhSecret"];

            var stripeEvent = EventUtility.ConstructEvent(json, _httpContextAccessor.HttpContext.Request.Headers["Stripe-Signature"], endpointSecret);

            if (stripeEvent.Type == Events.PaymentIntentSucceeded)
            {
                var paymentIntent = stripeEvent.Data.Object as PaymentIntent;
                var reservation = await _storeContext.Reservations.Where(r => r.PaymentIntentId.Equals(paymentIntent.Id)).SingleOrDefaultAsync();
                if (reservation != null) 
                {
                    return false;
                }

                reservation.PaymentStatus = Entities.Enums.PaymentStatus.PAYMENT_RECEIVED;
                await _storeContext.SaveChangesAsync();
                return true;
            }

            return null;

        }
    }
}
