using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FullStackApp.Models;
using FullStackApp.Services;

namespace FullStackApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterDto userDto)
        {
            try
            {
                // Validate request
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // Check if user exists
                if (await _authService.UserExistsAsync(userDto.Email))
                    return BadRequest("User with this email already exists");

                // Create user object
                var user = new User
                {
                    Name = userDto.Name,
                    Email = userDto.Email,
                    Phone = userDto.Phone
                };

                // Create user
                var createdUser = await _authService.RegisterAsync(user, userDto.Password);

                return Ok(new
                {
                    Id = createdUser.Id,
                    Name = createdUser.Name,
                    Email = createdUser.Email,
                    Phone = createdUser.Phone
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userDto)
        {
            try
            {
                // Validate request
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                // Login user
                var token = await _authService.LoginAsync(userDto.Email, userDto.Password);

                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }

    public class UserRegisterDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
    }

    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
