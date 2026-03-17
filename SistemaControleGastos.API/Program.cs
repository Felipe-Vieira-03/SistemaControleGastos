using SistemaControleGastos.API.Extensions;
using SistemaControleGastos.Domain.Interfaces;
using SistemaControleGastos.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddHttpContextAccessor();
builder.Services.AddControllers();
//builder.Services.AddSwaggerGen();

builder.Services.AddDatabase(builder.Configuration)
                .AddApplicationServices(builder.Configuration)
                .AddJWTConfig(builder.Configuration)
                .AddApiCors();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors("DefaultCors")
   .UseHttpsRedirection()
   .UseAuthentication()
   .UseAuthorization();

app.MapControllers();

app.Run();
