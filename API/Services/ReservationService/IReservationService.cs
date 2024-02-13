using API.DTOs;

namespace API.Services.ReservationService
{
    public interface IReservationService
    {
        Task<ReservationDTO?> CreateReservation(CreateReservationDTO reservationDTO);
        Task<ReservationDTO?> GetReservationById(int reservationId);
    }
}