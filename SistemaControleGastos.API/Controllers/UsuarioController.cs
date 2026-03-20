using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using SistemaControleGastos.API.RouteConstants;
using SistemaControleGastos.Application.Services;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces.Utils;

namespace SistemaControleGastos.API.Controllers
{
    public class UsuarioController : BaseController
    {
        private readonly UsuarioService _service;
        private readonly ICriptografiaUtils _cripto;

        public UsuarioController(IHttpContextAccessor context, UsuarioService service, ICriptografiaUtils cripto, TokenDto token) : base(context, token)
        {
            _service = service;
            _cripto = cripto;
        }

        [HttpPost(UsuarioAPI.AuthAsync)]
        [AllowAnonymous]
        public async Task<IActionResult> AuthAsync([FromBody] LoginRequest login)
        {
            var obj = await _service.AutenticacaoAsync(login.Email, login.Password);
            return Ok(obj);
        }
    
        [HttpPost(UsuarioAPI.CadastrarUsuario)]
        [AllowAnonymous]
        public async Task<IActionResult> CadastrarUsuario([FromBody] Usuario usuario)
        {
            var obj = await _service.CadastrarUsuario(usuario);
            return Ok(obj);
        }
        [HttpPost(UsuarioAPI.ObterUsuarioPorId)]
        [AllowAnonymous]
        public async Task<IActionResult> ObterUsuarioPorId([FromQuery] int usuarioId)
        {
            var obj = await _service.ObterUsuarioPorId(usuarioId);
            return Ok(obj);
        }
    }
}
