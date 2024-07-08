using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace Backend.Models{
    public class UserInputSignUp: UserInput {
        
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}