using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Backend.Models;

public class MyDBContext: IdentityDbContext{
    public MyDBContext(DbContextOptions<MyDBContext> options)  : base(options) {}
    public DbSet<Backend.Models.User> User { get; set;}
    public DbSet<Backend.Models.Bid> Bids { get; set;}
    public DbSet<Backend.Models.Property> Properties { get; set;}
}