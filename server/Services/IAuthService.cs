using System.Threading.Tasks;
using FullStackApp.Models;

namespace FullStackApp.Services
{
    public interface IAuthService
    {
        Task<User> RegisterAsync(User user, string password);
        Task<string> LoginAsync(string email, string password);
        Task<bool> UserExistsAsync(string email);
    }
}
