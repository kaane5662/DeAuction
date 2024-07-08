using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models{
    public class UserInput {
        public required string Email { get; set; }
        public  string? UserName { get; set; }
        [Required]
        [StringLength(100, MinimumLength =8)]
        public required string Password {get; set; }
    }
}