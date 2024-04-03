using API.Data;
using API.DTOs;
using API.DTOs.Product;
using API.DTOs.Reservation;
using API.Entities;
using API.Entities.Enums;
using API.Exceptions;
using API.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Globalization;

namespace API.Services.ReservationService
{
    public class ReservationService : IReservationService
    {
        private readonly StoreContext _storeContext;

        public ReservationService(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<List<ReservationDTO>?> GetReservationOfUser(string userId)
        {
            var reservations = await _storeContext.Reservations.Include(rsv => rsv.Restaurant).Include(rsv => rsv.OrderedProducts).Where(x => x.CustomerId.Equals(userId)).ToListAsync();
            if (reservations.IsNullOrEmpty())
            {
                return null;
            }

            return reservations.Select(reservation => new ReservationDTO()
            {
                Id = reservation.Id,
                SubmitDate = reservation.SubmitDate.ToString("yyyy-MM-dd"),
                ReservedDate = reservation.ReservedDate.ToString("yyyy-MM-dd"),
                ReservedTime = reservation.ReservedTime,
                Cost = reservation.Cost,
                Seats = reservation.Seats,
                PaymentStatus = Enum.GetName<PaymentStatus>(reservation.PaymentStatus) ?? "",
                OrderedProducts = reservation.OrderedProducts.Select(item => new OrderItemDTO()
                {
                    Id = item.Id,
                    Title = item.Product.Title,
                    Price = item.Price,
                    ImageUrl = item.Product.ImageUrl,
                    ProductId = item.Product.ProductId,
                    Quantity = item.Quantity
                }).ToList(),
                CustomerId = reservation.CustomerId,
                Restaurant = reservation.Restaurant.MapToDTO(),
            }).ToList();
        }

        public async Task<ReservationDTO?> GetReservationById(int reservationId)
        {
            var reservation = await _storeContext.Reservations.Include(rsv => rsv.Restaurant).Include(rsv => rsv.OrderedProducts).Where(x => x.Id == reservationId).SingleOrDefaultAsync();
            if (reservation == null)
            {
                return null;
            }

            return new ReservationDTO()
            {
                Id = reservation.Id,
                SubmitDate = reservation.SubmitDate.ToString("yyyy-MM-dd"),
                ReservedDate = reservation.ReservedDate.ToString("yyyy-MM-dd"),
                ReservedTime = reservation.ReservedTime,
                Cost = reservation.Cost,
                Seats = reservation.Seats,
                OrderedProducts = reservation.OrderedProducts.Select(item => new OrderItemDTO()
                {
                    Id = item.Id,
                    Title = item.Product.Title,
                    Price = item.Price,
                    ImageUrl = item.Product.ImageUrl,
                    ProductId = item.Product.ProductId,
                    Quantity = item.Quantity
                }).ToList(),
                CustomerId = reservation.CustomerId,
                Restaurant = reservation.Restaurant.MapToDTO(),
            };
        }

        public async Task<ReservationDTO?> CreateReservation(CreateReservationDTO reservationDTO)
        {
            DateTime reservationDate;
            if (!DateTime.TryParse(reservationDTO.ReservedDate, out reservationDate))
            {
                throw new FormatException();
            }

            TimeSpan reservedTimeSlot;
            if (!TimeSpan.TryParseExact(reservationDTO.ReservedTime, @"hh\:mm", CultureInfo.CurrentCulture, out reservedTimeSlot))
            {
                throw new FormatException();
            }

            var restaurant = await _storeContext.Restaurants
                .Include(rest => rest.WorkingHours)
                .ThenInclude(wh => wh.TimeSlots)
                .Where(rest => rest.Id == reservationDTO.RestaurantId)
                .SingleOrDefaultAsync();

            if (restaurant == null)
            {
                throw new KeyNotFoundException($"Restaurant with the specified ID #{reservationDTO.RestaurantId} not found");
            }

            if (reservationDTO.Seats > restaurant.MaxPeopleServedPerTable)
            {
                return null;
            }

            var wh = restaurant.WorkingHours.Where(wh => wh.Weekday == reservationDate.DayOfWeek).SingleOrDefault();
            if (wh == null)
            {
                throw new WorkingHoursNotFoundException("Restaurant has no records of working hours for the specified day.");
            }

            var timeSlot = wh.TimeSlots.Where(ts => ts.StartTime == reservedTimeSlot).SingleOrDefault();
            if (timeSlot == null)
            {
                throw new KeyNotFoundException("Specified time slot was not found.");
            }
            else if (!timeSlot.Available || timeSlot.StartTime < DateTime.Now.TimeOfDay)
            {
                return null;
            }
            else
            {

                var basket = await _storeContext.Baskets
                .Include(b => b.Items)
                .ThenInclude(it => it.Product)
                .Where(b => b.ClientId.Equals(reservationDTO.CustomerId))
                .SingleOrDefaultAsync();

                if (basket == null)
                {
                    throw new KeyNotFoundException($"Basket of the user #{reservationDTO.CustomerId} not found");
                }

                if(basket.Items.GroupBy(b => b.Product.RestaurantId).Count() != 1)
                {
                    throw new ArgumentException("Items are from different restaurants.");
                }

                timeSlot.Available = false;

                long basketCost = basket.Items.Sum(it => it.Quantity * it.Product.Price);

                var items = new List<OrderItem>();
                foreach(var item in basket.Items)
                {
                    var product = new OrderedProduct()
                    {
                        ProductId = item.Product.Id,
                        Title = item.Product.Title,
                        ImageUrl = item.Product.ImageUrl
                    };

                    var orderedItem = new OrderItem()
                    {
                        Price = item.Product.Price,
                        Quantity = item.Quantity,
                        Product = product
                    };

                    items.Add(orderedItem);

                }

                var reservation = new Reservation()
                {
                    SubmitDate = DateTime.Now,
                    ReservedDate = reservationDate,
                    ReservedTime = reservedTimeSlot,
                    Seats = reservationDTO.Seats,
                    CustomerId = reservationDTO.CustomerId,
                    PaymentIntentId = basket.PaymentIntentId!,
                    Cost = basketCost,
                    OrderedProducts = items,
                    RestaurantId = reservationDTO.RestaurantId
                };

                _storeContext.Baskets.Remove(basket);
                _storeContext.Reservations.Add(reservation);
                await _storeContext.SaveChangesAsync();

                return new ReservationDTO()
                {
                    Id = reservation.Id,
                    SubmitDate = reservation.SubmitDate.ToString("yyyy-MM-dd"),
                    ReservedDate = reservation.ReservedDate.ToString("yyyy-MM-dd"),
                    ReservedTime = reservation.ReservedTime,
                    Cost = reservation.Cost,
                    Seats = reservation.Seats,
                    OrderedProducts = reservation.OrderedProducts.Select(item => new OrderItemDTO()
                    {
                        Id = item.Id,
                        Title = item.Product.Title,
                        Price = item.Price,
                        ImageUrl = item.Product.ImageUrl,
                        ProductId = item.Product.ProductId,
                        Quantity = item.Quantity
                    }).ToList(),
                    CustomerId = reservation.CustomerId,
                    Restaurant = reservation.Restaurant.MapToDTO(),
                };
            }

        }


    }
}
