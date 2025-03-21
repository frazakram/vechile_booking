using System.ComponentModel.DataAnnotations;

namespace FullStackApp.Models
{
    public class ServiceCenter
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Address { get; set; }
        
        [Required]
        [StringLength(20)]
        public string Phone { get; set; }
        
        [StringLength(100)]
        [EmailAddress]
        public string Email { get; set; }
    }
}
