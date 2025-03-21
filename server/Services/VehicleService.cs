using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FullStackApp.Data;
using FullStackApp.Models;

namespace FullStackApp.Services
{
    public class VehicleService : IVehicleService
    {
        private readonly ApplicationDbContext _context;

        public VehicleService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Vehicle>> GetUserVehiclesAsync(int userId)
        {
            return await _context.Vehicles
                .Where(v => v.UserId == userId)
                .ToListAsync();
        }

        public async Task<Vehicle> GetVehicleByIdAsync(int id)
        {
            return await _context.Vehicles.FindAsync(id);
        }

        public async Task<Vehicle> CreateVehicleAsync(Vehicle vehicle)
        {
            await _context.Vehicles.AddAsync(vehicle);
            await _context.SaveChangesAsync();
            return vehicle;
        }

        public async Task<bool> UpdateVehicleAsync(Vehicle vehicle)
        {
            _context.Vehicles.Update(vehicle);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteVehicleAsync(int id)
        {
            var vehicle = await GetVehicleByIdAsync(id);
            if (vehicle == null)
                return false;

            _context.Vehicles.Remove(vehicle);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
