using System.Collections.Generic;
using System.Threading.Tasks;
using FullStackApp.Models;

namespace FullStackApp.Services
{
    public interface IBookingService
    {
        Task<IEnumerable<Booking>> GetUserBookingsAsync(int userId);
        Task<Booking> GetBookingByIdAsync(int id);
        Task<Booking> CreateBookingAsync(Booking booking);
        Task<bool> UpdateBookingAsync(Booking booking);
        Task<bool> CancelBookingAsync(int id);
        Task<IEnumerable<ServiceHistory>> GetUserServiceHistoryAsync(int userId);
    }
}
