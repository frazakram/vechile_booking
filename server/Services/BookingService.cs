using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FullStackApp.Data;
using FullStackApp.Models;

namespace FullStackApp.Services
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _context;

        public BookingService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Booking>> GetUserBookingsAsync(int userId)
        {
            return await _context.Bookings
                .Include(b => b.Vehicle)
                .Include(b => b.ServiceType)
                .Include(b => b.ServiceCenter)
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.BookingDate)
                .ToListAsync();
        }

        public async Task<Booking> GetBookingByIdAsync(int id)
        {
            return await _context.Bookings
                .Include(b => b.Vehicle)
                .Include(b => b.ServiceType)
                .Include(b => b.ServiceCenter)
                .FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task<Booking> CreateBookingAsync(Booking booking)
        {
            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();
            return booking;
        }

        public async Task<bool> UpdateBookingAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> CancelBookingAsync(int id)
        {
            var booking = await GetBookingByIdAsync(id);
            if (booking == null)
                return false;

            booking.Status = "Cancelled";
            return await UpdateBookingAsync(booking);
        }

        public async Task<IEnumerable<ServiceHistory>> GetUserServiceHistoryAsync(int userId)
        {
            return await _context.ServiceHistories
                .Include(sh => sh.Booking)
                .ThenInclude(b => b.Vehicle)
                .Include(sh => sh.Booking)
                .ThenInclude(b => b.ServiceType)
                .Include(sh => sh.Booking)
                .ThenInclude(b => b.ServiceCenter)
                .Where(sh => sh.Booking.UserId == userId)
                .OrderByDescending(sh => sh.ServiceDate)
                .ToListAsync();
        }
    }
}
