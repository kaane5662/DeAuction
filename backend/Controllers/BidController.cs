using System.Collections.Generic;
using System.Linq;  
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore.Internal;

[Route("/api/[controller]")]
[ApiController]
public class BidController: ControllerBase {
    private readonly MyDBContext _context;
    public BidController(MyDBContext context) { 
        _context = context;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetBids(int id){
        try{
            var bids = await _context.Bids
            .OrderByDescending(b=>b.Price)
            .Join(
                _context.User,
                bid =>bid.UserId,
                user => user.Id,
                (bid, user)=>new {
                    CreatedAt = bid.CreatedAt,
                    UserId = bid.UserId,
                    Price = bid.Price,
                    PropertyId = bid.PropertyId,
                    Email = user.Email
                
                } 
            ).Where(joinedResult => joinedResult.PropertyId == id).ToListAsync();
            if(bids == null) return NotFound();
            return Ok(bids);
        }catch(Exception err){
            return BadRequest(err.Message);
        }
    }

    [HttpPost("{id}")]
    [Authorize]
    public async Task<IActionResult> PostBid([FromBody] BidInput bidForm, int id){
        if(HttpContext.Items.TryGetValue("UserId", out var userId)){
            Console.WriteLine(userId);
            var property = await _context.Properties.FirstAsync(p => p.Id == id);
            if(property == null) return NoContent();
            if(bidForm.Price <= property.Price ) return BadRequest("Must bid higher than current bidder");
            //cant bid twice

            if(await _context.Bids.AnyAsync(b => b.PropertyId == id && b.UserId == userId ) ) return BadRequest("You have already bidded");

            var newBid = new Bid{
                PropertyId = id,
                Price = bidForm.Price,   
                UserId = (string) userId,
                CreatedAt = DateTime.UtcNow
            };

            property.Price = bidForm.Price;

            
            _context.Bids.Add(newBid);
            await _context.SaveChangesAsync();
            return Created();
        }

        return Forbid();
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateBid([FromForm] BidInput bidForm, int id){
        if(HttpContext.Items.TryGetValue("UserId", out var userId)){
            var result = await _context.Bids.FirstOrDefaultAsync(b=> b.Id == id && b.UserId == (String) userId);
            if(result == null) return NotFound();
            result.Price = bidForm.Price;
            await _context.SaveChangesAsync();

            return Created();
        }
        return Forbid();
    }
    [HttpGet("user")]
    public async Task<IActionResult> GetUserBids(){
        if(HttpContext.Items.TryGetValue("UserId", out var userId)){
            var bids = await _context.Bids
            .OrderByDescending(b=>b.CreatedAt)
            .Join(
                _context.Properties,
                bid =>bid.PropertyId,
                property => property.Id,
                (bid, property)=>new {
                    CreatedAt = bid.CreatedAt,
                    YourBid = bid.Price,
                    CurrentBid = property.Price,
                    PropertyId = bid.PropertyId,
                    UserId = bid.UserId
                } 
            ).Where(joinedResult => joinedResult.UserId == userId).ToListAsync();
            if(bids == null) return NotFound();
            return Ok(bids);
        }
        return Forbid();
    }

}