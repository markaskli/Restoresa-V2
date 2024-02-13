using Microsoft.EntityFrameworkCore;

namespace API.Entities
{
    [Owned]
    public class OrderedProduct
    {
        public int ProductId { get; set; }
        public required string Title { get; set; }
        public required string ImageUrl { get; set; }
    }
}
