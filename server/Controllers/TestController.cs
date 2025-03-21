using Microsoft.AspNetCore.Mvc;
using FullStackApp.Data;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace FullStackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TestController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "API is working!" });
        }

        [HttpGet("db")]
        public async Task<IActionResult> TestDatabase()
        {
            try
            {
                // Check if database exists
                bool dbExists = await _context.Database.CanConnectAsync();
                
                // Get table counts
                int userCount = 0;
                int serviceTypeCount = 0;
                
                try {
                    userCount = await _context.Users.CountAsync();
                } catch (Exception) {
                    // Users table doesn't exist
                }
                
                try {
                    serviceTypeCount = await _context.ServiceTypes.CountAsync();
                } catch (Exception) {
                    // ServiceTypes table doesn't exist
                }
                
                return Ok(new { 
                    databaseConnected = dbExists,
                    userCount = userCount,
                    serviceTypeCount = serviceTypeCount
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }

        [HttpPost("create-db")]
        public async Task<IActionResult> CreateDatabase()
        {
            try
            {
                // Create the database if it doesn't exist
                await _context.Database.EnsureCreatedAsync();
                return Ok(new { message = "Database created or already exists" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message, stackTrace = ex.StackTrace });
            }
        }
    }
}
