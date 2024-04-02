using API.DTOs.Basket;

namespace API.Services.PaymentService
{
    public interface IPaymentService
    {
        Task<BasketDTO?> CreateOrUpdatePaymentIntent();
        Task<bool?> Webhook();
    }
}