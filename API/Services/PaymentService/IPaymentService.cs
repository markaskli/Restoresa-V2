using API.DTOs;

namespace API.Services.PaymentService
{
    public interface IPaymentService
    {
        Task<BasketDTO?> CreateOrUpdatePaymentIntent();
        Task<bool?> Webhook();
    }
}