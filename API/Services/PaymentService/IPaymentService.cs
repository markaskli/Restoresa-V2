using API.DTOs.Basket;

namespace API.Services.PaymentService
{
    public interface IPaymentService
    {
        Task<BasketDTO?> CreateOrUpdatePaymentIntent(string userId);
        Task<bool?> Webhook();
    }
}