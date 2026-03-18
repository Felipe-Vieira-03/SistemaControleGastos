using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using SistemaControleGastos.Application.Services;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Interfaces;
using SistemaControleGastos.Domain.Interfaces.Service;
using SistemaControleGastos.Domain.Interfaces.Utils;
using SistemaControleGastos.Domain.Utils;
using SistemaControleGastos.Infrastructure.Data;
using SistemaControleGastos.Infrastructure.Repositories;
using SistemaControleGastos.Infrastructure.Services;
using System.Text;

namespace SistemaControleGastos.API.Extensions
{
    public static class ServiceCollectionExtensions
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {


           services.AddScoped<UsuarioService>();
           services.AddScoped<PessoaService>();
           services.AddScoped<CategoriaService>();
           services.AddScoped<TransacaoService>();

           services.AddScoped<IUsuarioRepository, UsuarioRepository>();
           services.AddScoped<IPessoaRepository, PessoaRepository>();
           services.AddScoped<ICategoriaRepository, CategoriaRepository>();
           services.AddScoped<ITransacaoRepository, TransacaoRepository>();

           services.AddScoped<ITokenService, TokenService>();
           services.AddScoped<TokenDto>();

           services.AddScoped<ICriptografiaUtils, CriptografiaUtils>();
           return services;

        }
        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
        var connectionString = configuration.GetConnectionString("SistemaControleGastos");

            services.AddDbContext<AppDbContext>(options =>
                    options.UseSqlServer(connectionString)
                           .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
                           .EnableSensitiveDataLogging()
                           .EnableDetailedErrors()
                           .ConfigureWarnings(warnings =>
                                warnings.Ignore(RelationalEventId.PendingModelChangesWarning)));

            return services;
        }
        //public static IServiceCollection AddApiDocumentation(this IServiceCollection services, IConfiguration configuration))
        //{

        //}

        public static IServiceCollection AddApiCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", policy =>
                {
                    policy.AllowAnyOrigin()
                          .AllowAnyMethod()
                          .AllowAnyHeader();
                });
            });

            return services;
        }
        public static IServiceCollection AddApiDocumentation(this IServiceCollection services)
        {
            services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Sistema de Controle de Gastos API",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer",      
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "API do sistema de controle de gastos"
                });

                options.AddSecurityRequirement(document =>
                    new OpenApiSecurityRequirement
                    {
                        [new OpenApiSecuritySchemeReference("Bearer", document)] = []
                    });
            });
            return services;
        }


        public static IServiceCollection AddJWTConfig(this IServiceCollection services, IConfiguration configuration)
        {
            var secretKey = configuration["JwtSettings:SecretKey"];

            var key = Encoding.UTF8.GetBytes(secretKey);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    RequireExpirationTime = true,
                    ValidateLifetime = true,

                    ValidateIssuer = false,
                    ValidateAudience = false,

                    ClockSkew = TimeSpan.Zero
                };
            });

            return services;
        }

    }
}
