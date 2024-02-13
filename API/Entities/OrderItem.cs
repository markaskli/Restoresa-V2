namespace API.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }
        public long Price { get; set; } 
        public int Quantity { get; set; }
        public required OrderedProduct Product { get; set; }
    }
}
