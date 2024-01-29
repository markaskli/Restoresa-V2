namespace API.Exceptions
{
    public class WorkingHoursNotFoundException : Exception
    {
        public WorkingHoursNotFoundException()
        {
        }

        public WorkingHoursNotFoundException(string message) : base(message) 
        {
        }

        public WorkingHoursNotFoundException(string message, Exception inner) : base(message, inner) 
        {
        }
    }
}
