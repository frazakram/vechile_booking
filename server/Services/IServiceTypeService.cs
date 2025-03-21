using System.Collections.Generic;
using System.Threading.Tasks;
using FullStackApp.Models;

namespace FullStackApp.Services
{
    public interface IServiceTypeService
    {
        Task<IEnumerable<ServiceType>> GetAllServiceTypesAsync();
        Task<ServiceType> GetServiceTypeByIdAsync(int id);
        Task<IEnumerable<ServiceCenter>> GetAllServiceCentersAsync();
        Task<ServiceCenter> GetServiceCenterByIdAsync(int id);
    }
}
