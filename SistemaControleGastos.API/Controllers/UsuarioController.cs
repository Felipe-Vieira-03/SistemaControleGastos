using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using SistemaControleGastos.Application.Services;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Interfaces.Utils;
using System.Data;

namespace SistemaControleGastos.API.Controllers
{
    public class UsuarioController :  BaseController
    {
        private readonly UsuarioService _service;

        public UsuarioController(IHttpContextAccessor httpContextAccessor, UsuarioService service, TokenDto infoToken)
        {
            _service = service;
        }


        [HttpPost("Auth")]
        [AllowAnonymous]
        public async Task<IActionResult> Auth([FromBody] LoginRequest login)
        {
            var obj = await _service.AutenticacaoAsync(login.Email, login.Password);
            return Ok(obj);
        }
    }
}
