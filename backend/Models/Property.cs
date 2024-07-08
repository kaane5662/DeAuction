namespace Backend.Models{
    public class Property {
        public int Id { get; set; }
        public required string Title{get; set;}
        public required string Description{get; set;}
        public required decimal Price{get; set;}
        public String[]? Features {get; set;}
        public DateTime CreatedAt { get; set; } 

        public required string UserId{get; set;}

        public required string Address{get; set;}
        public required int Zip{get; set;}
        public required string State{get; set;}
        public required string City{get; set;}

    }
}