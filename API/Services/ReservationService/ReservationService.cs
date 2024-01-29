using API.Data;
using API.DTOs;
using API.Entities;
using API.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace API.Services.ReservationService
{
    public class ReservationService
    {
        private readonly StoreContext _storeContext;

        public ReservationService(StoreContext storeContext) 
        {
            _storeContext = storeContext;
        }

        public async Task<ReservationDTO> CreateReservation(CreateReservationDTO reservationDTO)
        {
            //DateTime reservationDate = reservationDTO.ReservationTime;
            //int weekDay = (int)reservationDate.DayOfWeek;

            //List<WorkingHours> restaurantsWorkingHours = await _storeContext.WorkingHours.Where(wh => wh.RestaurantId == reservationDTO.RestaurantId).ToListAsync();
            //if (!restaurantsWorkingHours.Any())
            //{
            //    throw new WorkingHoursNotFoundException("Working hours of specified restaurant not found");
            //}

            //WorkingHours workingHoursOfDay = restaurantsWorkingHours.SingleOrDefault(wh => wh.WeekDay == weekDay);
            //if (workingHoursOfDay == null)
            //{
            //    throw new WorkingHoursNotFoundException("Restaurant doesn't work on the specified day of the week");
            //}



            


            var basket = await _storeContext.Baskets.Include(b => b.Items).ThenInclude(it => it.Product).Where(b => b.ClientId.Equals(reservationDTO.UserId)).SingleOrDefaultAsync();
            if (basket == null)
            {
                throw new KeyNotFoundException($"Basket of the user {reservationDTO.UserId} not found");
            }

            var reservation = new Reservation()
            {
                ReservationDate = DateTime.Now,
                StartTime = reservationDTO.StartTime,
                EndTime = reservationDTO.EndTime,
                Seats = reservationDTO.Seats,
                UserId = reservationDTO.UserId,
                RestaurantId = reservationDTO.RestaurantId
            };



            foreach(BasketItem item in basket.Items)
            {
                reservation.Cost += item.Quantity * item.Product.Price;
                reservation.OrderedProducts.Add(item.Product);
            }

            
            await _storeContext.Reservations.AddAsync(reservation);
            await _storeContext.SaveChangesAsync();

            return new ReservationDTO()
            {
                Id = reservation.Id,
                OrderDate = reservation.ReservationDate,
                StartTime = reservation.StartTime,
                EndTime = reservation.EndTime,
                Cost = reservation.Cost,
                Seats = reservation.Seats,
                OrderedProducts = reservation.OrderedProducts.Select(prod => new ProductDTO()
                {
                    Id = prod.Id,
                    Type = prod.Type,
                    Title = prod.Title,
                    Description = prod.Description,
                    Price = prod.Price,
                    ImageUrl = prod.ImageUrl,
                    RestaurantId = prod.RestaurantId,
                }).ToList(),
                UserId = reservation.UserId,
                RestaurantId = reservation.RestaurantId,                
            };
        }

        public async Task<bool> CancelReservation(int reservationId)
        {
            var reservation = await _storeContext.Reservations.FindAsync(reservationId);
            return false;
        }
    }
}
