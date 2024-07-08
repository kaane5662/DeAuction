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
public class PropertyController: ControllerBase {
    private readonly MyDBContext _context;
    public PropertyController(MyDBContext context) { 
        _context = context;
    }

    [HttpPost("")]
    [Authorize]
    public async Task<IActionResult> ListProperty([FromForm] PropertyInput propertyForm){
        Console.WriteLine("Inside the authorized route");
        if(HttpContext.Items.TryGetValue("UserId", out var userId)){
            Console.WriteLine("Token: ",userId);
            

            var newProperty = new Backend.Models.Property{
                Title  = propertyForm.Title,
                Description = propertyForm.Description,
                Price = propertyForm.Price,
                Features = propertyForm.Features,

                Address = propertyForm.Address,
                Zip = propertyForm.Zip,
                State = propertyForm.State,
                City = propertyForm.City,
                
                UserId = (String) userId
            };
            
            _context.Properties.Add(newProperty);
            await _context.SaveChangesAsync();

            return Created("property", newProperty);    
        }

        return Forbid();
    }

    [HttpGet("")]
    public async Task<IActionResult> GetProperties(){
        try{

            var properties = await _context.Properties.ToListAsync();
            if(properties == null) return NotFound();
            return Ok(properties);

        }catch(Exception err){
            return BadRequest(err.Message);
        }
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetProperty(int id){
        try{

            var properties = await _context.Properties.Where(p=>p.Id == id).FirstAsync();
            if(properties == null) return NotFound();
            return Ok(properties);

        }catch(Exception err){
            return BadRequest(err.Message);
        }
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> UpdateProperty([FromForm] PropertyInput propertyForm, int id){
        Console.WriteLine("Inside the authorized route");
        if(HttpContext.Items.TryGetValue("UserId", out var userId)){
            Console.WriteLine("Token: ",userId);
            
            var property = await _context.Properties.FirstOrDefaultAsync(p => p.Id == id && p.UserId == (string)userId);
            Console.WriteLine(property);
            if(property == null) return NotFound();
            property.Features = propertyForm.Features;
            property.Address = propertyForm.Address;
            property.Zip = propertyForm.Zip;
            property.State = propertyForm.State;
            property.City = propertyForm.City;
            property.Description = propertyForm.Description;
            property.Title = propertyForm.Title;
            property.Price = propertyForm.Price;
            
            await _context.SaveChangesAsync();

            return Ok();    
        }

        return Forbid();
    }



    

}