namespace API.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime ReservationDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public long Cost { get; set; }
        public int Seats { get; set; }
        public List<Product> OrderedProducts { get; set; }
        public virtual int RestaurantId { get; set; }
        public virtual Restaurant Restaurant { get; set; } = null!;
        public virtual string UserId { get; set; } = null!;
        public virtual User User { get; set; } = null!;

        public Reservation()
        {
            OrderedProducts = new List<Product>();
        }

    }
}
