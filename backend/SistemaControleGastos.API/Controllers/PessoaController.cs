using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaControleGastos.API.RouteConstants;
using SistemaControleGastos.Application.Services;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;
using SistemaControleGastos.Domain.Interfaces.Utils;
using System.Data;

namespace SistemaControleGastos.API.Controllers
{
    public class PessoaController : BaseController
    {
        private readonly PessoaService _service;
        private readonly ICriptografiaUtils _cripto;

        public PessoaController(IHttpContextAccessor context, PessoaService service, ICriptografiaUtils cripto, TokenDto token) : base(context, token)
        {
            _service = service;
            _cripto = cripto;
        }

        [HttpPost(PessoaAPI.CadastrarPessoaAsync)]
        public async Task<IActionResult> CadastrarPessoaAsync([FromBody] Pessoa pessoa)
        {
            var result = await _service.CadastrarPessoaAsync(pessoa);
            return Ok(result);
        }

        [HttpPut(PessoaAPI.EditarPessoaAsync)]
        public async Task<IActionResult> EditarPessoaAsync([FromBody] Pessoa pessoa)
        {
            var result = await _service.EditarPessoaAsync(pessoa);
            return Ok(result);
        }

        [HttpDelete(PessoaAPI.DeletarPessoaAsync)]
        public async Task<IActionResult> DeletarPessoaAsync([FromQuery] int pessoaId)
        {
            var result = await _service.DeletarPessoaAsync(pessoaId);
            return Ok(result);
        }

        [HttpGet(PessoaAPI.ObterTodasPessoasAsync)]
        public async Task<IActionResult> ObterTodasPessoasAsync()
        {
            var result = await _service.ObterTodasPessoasAsync();
            return Ok(result);
        }

        [HttpGet(PessoaAPI.ObterPessoaPorIdAsync)]
        public async Task<IActionResult> ObterPessoaPorIdAsync([FromQuery] int pessoaId)
        {
            var result = await _service.ObterPessoaPorIdAsync(pessoaId);
            return Ok(result);
        }
    }
}
