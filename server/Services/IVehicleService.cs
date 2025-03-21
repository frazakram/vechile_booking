using System.Collections.Generic;
using System.Threading.Tasks;
using FullStackApp.Models;

namespace FullStackApp.Services
{
    public interface IVehicleService
    {
        Task<IEnumerable<Vehicle>> GetUserVehiclesAsync(int userId);
        Task<Vehicle> GetVehicleByIdAsync(int id);
        Task<Vehicle> CreateVehicleAsync(Vehicle vehicle);
        Task<bool> UpdateVehicleAsync(Vehicle vehicle);
        Task<bool> DeleteVehicleAsync(int id);
    }
}
