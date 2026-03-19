using Microsoft.AspNetCore.Mvc;
using SistemaControleGastos.API.RouteConstants;
using SistemaControleGastos.Application.Services;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces.Utils;

namespace SistemaControleGastos.API.Controllers
{
    public class CategoriaController : BaseController
    {
        private readonly CategoriaService _service;
        private readonly ICriptografiaUtils _cripto;

        public CategoriaController(IHttpContextAccessor context, CategoriaService service, ICriptografiaUtils cripto, TokenDto token) : base(context, token)
        {
            _service = service;
            _cripto = cripto;
        }

        [HttpPost(CategoriaAPI.CadastrarCategoriaAsync)]
        public async Task<IActionResult> CadastrarCategoriaAsync([FromBody] Categoria categoria)
        {
            var result = await _service.CadastrarCategoriaAsync(categoria);
            return Ok(result);
        }

        [HttpPut(CategoriaAPI.EditarCategoriaAsync)]
        public async Task<IActionResult> EditarCategoriaAsync([FromBody] Categoria categoria)
        {
            var result = await _service.EditarCategoriaAsync(categoria);
            return Ok(result);
        }

        [HttpDelete(CategoriaAPI.DeletarCategoriaAsync)]
        public async Task<IActionResult> DeletarCategoriaAsync([FromQuery] int categoriaId)
        {
            var result = await _service.DeletarCategoriaAsync(categoriaId);
            return Ok(result);
        }

        [HttpGet(CategoriaAPI.ObterTodasCategoriasAsync)]
        public async Task<IActionResult> ObterTodasCategoriasAsync()
        {
            var result = await _service.ObterTodasCategoriasAsync();
            return Ok(result);
        }

        [HttpGet(CategoriaAPI.ObterCategoriaPorIdAsync)]
        public async Task<IActionResult> ObterCategoriaPorIdAsync([FromQuery] int categoriaId)
        {
            var result = await _service.ObterCategoriaPorIdAsync(categoriaId);
            return Ok(result);
        }
    }
}
