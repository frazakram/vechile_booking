using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackApp.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        public int VehicleId { get; set; }
        
        [Required]
        public int ServiceTypeId { get; set; }
        
        [Required]
        public int ServiceCenterId { get; set; }
        
        [Required]
        public DateTime BookingDate { get; set; }
        
        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending"; // Pending, Confirmed, Completed, Cancelled
        
        public string Notes { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
        
        [ForeignKey("VehicleId")]
        public virtual Vehicle Vehicle { get; set; }
        
        [ForeignKey("ServiceTypeId")]
        public virtual ServiceType ServiceType { get; set; }
        
        [ForeignKey("ServiceCenterId")]
        public virtual ServiceCenter ServiceCenter { get; set; }
    }
}
