using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models{
    public class User: IdentityUser {
        // public int Id { get; set; }
        // public override required string Email { get; set; }
        public string? Password {get; set; }
        // public override string? UserName {get; set;}
        public string? WalletAddress {get; set;}
        public DateTime CreatedAt {get; set;}

    }
}