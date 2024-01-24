namespace API.Entities
{
    public class WorkingHours
    {
        public int Id { get; set; }
        public int WeekDay { get; set; }
        public int OpenTime { get; set; }
        public int CloseTime { get; set; }
        public virtual int RestaurantId { get; set; }

    }
}
