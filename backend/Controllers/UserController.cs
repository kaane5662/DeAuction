using System.Collections.Generic;
using System.Linq;  
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity;
using System.Net;

[Route("/api/[controller]")]
[ApiController]
public class UserController : ControllerBase {
    private readonly MyDBContext _context;
    private readonly IConfiguration _configuration;
    private readonly JwtHelper _jwtHelper;

    public UserController(MyDBContext context, IConfiguration configuration, JwtHelper jwtHelper) {
        _context = context;
        _configuration = configuration;
        _jwtHelper = jwtHelper;
    }

    [HttpPost("")]
    public async Task<IActionResult> Signup([FromForm] UserInputSignUp userSignUp){
        var result = await _context.Users.AnyAsync(u=>  u.Email == userSignUp.Email);
        Console.WriteLine(result);
        if(result ){
            return BadRequest("Username or email already exists");
        }
        Console.WriteLine(userSignUp.Email);
        Console.WriteLine(userSignUp.Password);
        var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(userSignUp.Password));
        var passwordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(userSignUp.Password)));

        var newUser = new User{
            Email = userSignUp.Email,   
            PasswordHash = passwordHash, 
            UserName = userSignUp.UserName,
        };      
         _context.Users.Add(newUser);   
         await _context.SaveChangesAsync();
        return Created("user",newUser);
        
    }

    [HttpPut("")]
    public async Task<IActionResult> Login([FromForm] UserInput userLogin) {
        Console.WriteLine(userLogin.Email);
        var user = await _context.Users
        .FirstAsync(u => u.Email == userLogin.Email );
        if (user == null){
            return BadRequest("Invalid login attempt.");
        }
        var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(userLogin.Password));
        var passwordHash = Convert.ToBase64String(hmac.ComputeHash(Encoding.UTF8.GetBytes(userLogin.Password)));
        Console.WriteLine(passwordHash);
        Console.WriteLine(user.PasswordHash);
        if (user.PasswordHash != passwordHash ) {
            return BadRequest("Invalid password");
        }
        Console.WriteLine(user.Id);
        string generatedToken = _jwtHelper.generateToken(user.Id);
        Console.WriteLine(generatedToken);
        CookieOptions cookieOptions = CookieHelper.GenerateCookie(4);
        Response.Cookies.Append("token",generatedToken, cookieOptions);
        return Ok();
    }

    [HttpGet("")]
    [Authorize]
    public async Task<IActionResult> GetUser(){
        Console.WriteLine("Inside the authorized route");
        if(HttpContext.Items.TryGetValue("UserId", out var userId)){
            Console.WriteLine("Token: ",userId);
            var user = await _context.User.FirstAsync(u=> u.Id == (string) userId);
            if(user == null) return NotFound();
            return Ok(user);    
        }

        return Forbid();
    }


    
}