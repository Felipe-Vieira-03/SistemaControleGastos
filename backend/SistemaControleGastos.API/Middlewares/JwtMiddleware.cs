using Microsoft.OpenApi;
using SistemaControleGastos.Domain.DTOs;

namespace SistemaControleGastos.API.Middlewares
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<JwtMiddleware> _logger;


        public JwtMiddleware(RequestDelegate next, ILogger<JwtMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }
        public async Task Invoke(HttpContext context, TokenDto _token)
        {
            var authHeader = context.Request.Headers["Authorization"].FirstOrDefault();
            Console.WriteLine("HEADER: " + authHeader);
            if (context.User.Identity.IsAuthenticated)
            {
                _token.Id = int.Parse(context.User.FindFirst(nameof(TokenDto.Id)).Value);
                _token.Email = context.User.FindFirst(nameof(TokenDto.Email)).Value;
                _token.DataCadastro = DateTime.Parse(context.User.FindFirst(nameof(TokenDto.DataCadastro)).Value);
            }

            await _next(context);
        }
    }
}
