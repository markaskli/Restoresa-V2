namespace API.DTOs
{
    public class OrderItemDTO
    {
        public int Id { get; set; }
        public long Price { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }
        public required string Title { get; set; }
        public required string ImageUrl { get; set; }
    }
}
