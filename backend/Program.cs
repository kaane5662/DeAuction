using dotenv.net;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

using System.Text;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddSingleton<JwtHelper>();

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy  =>
        {
            policy.WithOrigins("http://localhost:5173",
                                "http://www.contoso.com")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});



builder.Services.AddAuthentication(options=>{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})

.AddJwtBearer(options=>{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false, //for now
        ValidateAudience = false, //for now
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
    options.Events = new JwtBearerEvents{
        OnMessageReceived = context =>{
            Console.WriteLine("MIddleware part 1");
            if(context.Request.Cookies.ContainsKey("token")){
                
                context.Token = context.Request.Cookies["token"];
                Console.WriteLine(context.Token);
            }
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>{
            Console.WriteLine("Middleware Part 2");
            var userId = context.Principal.FindFirst(ClaimTypes.NameIdentifier).Value;
            Console.WriteLine(userId);
            context.HttpContext.Items["UserId"] = userId;
            Console.WriteLine("Http context UserId: " + context.HttpContext.Items["UserId"]);
            return Task.CompletedTask;
        },
        OnAuthenticationFailed = context =>{
           
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        }
        
    };
});

builder.Services.AddDbContext<MyDBContext>(options=> options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));
Console.WriteLine("Key: "+builder.Configuration["Jwt:Key"]);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseHttpsRedirection();

app.Run();

