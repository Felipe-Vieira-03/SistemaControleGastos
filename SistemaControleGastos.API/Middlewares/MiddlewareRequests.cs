using Microsoft.EntityFrameworkCore;

namespace SistemaControleGastos.API.Middleware
{
    public class MiddlewareRequests
    {
        private readonly RequestDelegate _next;

        public MiddlewareRequests(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            await _next(context);
        }
    }
}
