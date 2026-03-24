using Microsoft.EntityFrameworkCore;
using SistemaControleGastos.API.Errors;
using System.Net;
using System.Text.Json;

namespace SistemaControleGastos.API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _ambiente;

        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment ambiente)
        {
            _next = next;
            _logger = logger;
            _ambiente = ambiente;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var ret = _ambiente.IsDevelopment() ?
                    new ExceptionsErrors(context.Response.StatusCode.ToString(), ex.Message, ex.StackTrace.ToString()) :
                    new ExceptionsErrors(context.Response.StatusCode.ToString(), ex.Message, "Ocorreu um erro interno.");

                var caseResponse = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(ret, caseResponse);
                await context.Response.WriteAsync(json);
            }
        }
    }
}
