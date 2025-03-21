using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackApp.Models
{
    public class Vehicle
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int UserId { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Make { get; set; }
        
        [Required]
        [StringLength(50)]
        public string Model { get; set; }
        
        [Required]
        public int Year { get; set; }
        
        [Required]
        [StringLength(20)]
        public string LicensePlate { get; set; }
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        // Navigation property
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
