namespace API.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public int Duration { get; set; }
        public long Cost { get; set; }
        public int Seats { get; set; }
        public List<Product> OrderedProducts { get; set; }
        public virtual int RestaurantId { get; set; }
        public virtual Restaurant Restaurant { get; set; } = null!;
        public virtual int UserId { get; set; }
        public virtual User User { get; set; } = null!;

        public Reservation()
        {
            OrderedProducts = new List<Product>();
        }
    }
}
