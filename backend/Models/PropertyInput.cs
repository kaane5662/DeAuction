using System.ComponentModel.DataAnnotations;

namespace Backend.Models{
    public class PropertyInput {
        [Required]
        [StringLength(50,MinimumLength =10)]
        public required string Title{get; set;}
        [Required]
        [StringLength(500,MinimumLength =10)]
        public required string Description{get; set;}
        public required decimal Price{get; set;}
        public String[]? Features {get; set;}
        [Required]
        [StringLength(80,MinimumLength =10)]
        public required string Address{get; set;}
        [Required]
        [Range(10000,99999)]
        public required int Zip{get; set;}
        [Required]
        [StringLength(2,MinimumLength =2)]
        public required string State{get; set;}
        [Required]
        [StringLength(30,MinimumLength =2)]
        public required string City{get; set;}

    }
}