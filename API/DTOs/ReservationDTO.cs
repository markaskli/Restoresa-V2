using API.Entities;

namespace API.DTOs
{
    public class ReservationDTO
    {
        public int Id { get; set; }
        public DateTime Time { get; set; }
        public int Duration { get; set; }
        public long Cost { get; set; }
        public int Seats { get; set; }
        public List<ProductDTO> OrderedProducts { get; set; }
        public required int UserId { get; set; }

        public ReservationDTO()
        {
            OrderedProducts= new List<ProductDTO>();
        }
    }
}
