using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FullStackApp.Data;
using FullStackApp.Models;

namespace FullStackApp.Services
{
    public class ServiceTypeService : IServiceTypeService
    {
        private readonly ApplicationDbContext _context;

        public ServiceTypeService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ServiceType>> GetAllServiceTypesAsync()
        {
            return await _context.ServiceTypes.ToListAsync();
        }

        public async Task<ServiceType> GetServiceTypeByIdAsync(int id)
        {
            return await _context.ServiceTypes.FindAsync(id);
        }

        public async Task<IEnumerable<ServiceCenter>> GetAllServiceCentersAsync()
        {
            return await _context.ServiceCenters.ToListAsync();
        }

        public async Task<ServiceCenter> GetServiceCenterByIdAsync(int id)
        {
            return await _context.ServiceCenters.FindAsync(id);
        }
    }
}
