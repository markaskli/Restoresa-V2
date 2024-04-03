using API.Entities.Enums;

namespace API.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public long Cost { get; set; }
        public int Seats { get; set; }
        public string PaymentIntentId { get; set; } = null!;
        public DateTime SubmitDate { get; set; }
        public DateTime ReservedDate { get; set; }
        public TimeSpan ReservedTime { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public List<OrderItem> OrderedProducts { get; set; }
        public virtual int RestaurantId { get; set; }
        public virtual Restaurant Restaurant { get; set; } = null!;
        public virtual string CustomerId { get; set; } = null!;
        public virtual Customer Customer { get; set; } = null!;

        public Reservation()
        {
            OrderedProducts = new List<OrderItem>();
            PaymentStatus = PaymentStatus.PENDING;
        }



    }
}
