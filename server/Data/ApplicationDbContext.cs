using Microsoft.EntityFrameworkCore;
using FullStackApp.Models;

namespace FullStackApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<ServiceType> ServiceTypes { get; set; }
        public DbSet<ServiceCenter> ServiceCenters { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<ServiceHistory> ServiceHistories { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed data for ServiceTypes
            modelBuilder.Entity<ServiceType>().HasData(
                new ServiceType { Id = 1, Name = "Oil Change", Description = "Change vehicle oil and filter", Price = 30.00m },
                new ServiceType { Id = 2, Name = "Tire Rotation", Description = "Rotate tires for even wear", Price = 20.00m },
                new ServiceType { Id = 3, Name = "Brake Service", Description = "Inspect and service brakes", Price = 100.00m },
                new ServiceType { Id = 4, Name = "Full Service", Description = "Complete vehicle maintenance", Price = 150.00m }
            );

            // Seed data for ServiceCenters
            modelBuilder.Entity<ServiceCenter>().HasData(
                new ServiceCenter { Id = 1, Name = "Main Service Center", Address = "123 Main St, City", Phone = "555-123-4567", Email = "service@example.com" }
            );
        }
    }
}
