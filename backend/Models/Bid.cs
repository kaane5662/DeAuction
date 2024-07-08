namespace Backend.Models{
    public class Bid {
        public int Id { get; set;}
        public required int PropertyId{ get; set;}
        public required decimal Price { get; set;}
        public required string UserId{ get; set;}
        public DateTime CreatedAt{ get; set;}   

    }
}