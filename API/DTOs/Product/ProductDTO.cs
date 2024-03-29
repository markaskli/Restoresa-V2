namespace API.DTOs.Product
{
    public class ProductDTO
    {
        public int Id { get; set; }
        public required string Type { get; set; }
        public required string Title { get; set; }
        public required string Description { get; set; }
        public required int Price { get; set; }
        public required string ImageUrl { get; set; }
        public required int RestaurantId { get; set; }
    }
}
