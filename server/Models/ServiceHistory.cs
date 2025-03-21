using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FullStackApp.Models
{
    public class ServiceHistory
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public int BookingId { get; set; }
        
        [Required]
        public DateTime ServiceDate { get; set; }
        
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalCost { get; set; }
        
        public string TechnicianNotes { get; set; }
        
        // Navigation property
        [ForeignKey("BookingId")]
        public virtual Booking Booking { get; set; }
    }
}
