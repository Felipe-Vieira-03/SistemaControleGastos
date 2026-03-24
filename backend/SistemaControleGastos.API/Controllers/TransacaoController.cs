using Microsoft.AspNetCore.Mvc;
using SistemaControleGastos.API.RouteConstants;
using SistemaControleGastos.Application.Services;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces.Utils;

namespace SistemaControleGastos.API.Controllers
{
    public class TransacaoController : BaseController
    {
        private readonly TransacaoService _service;
        private readonly ICriptografiaUtils _cripto;

        public TransacaoController(IHttpContextAccessor context, TransacaoService service, ICriptografiaUtils cripto, TokenDto token) : base(context, token)
        {
            _service = service;
            _cripto = cripto;
        }
        [HttpPost(TransacaoAPI.CadastrarTransacaoAsync)]
        public async Task<IActionResult> CadastrarTransacaoAsync([FromBody] Transacao transacao)
        {
            var result = await _service.CadastrarTransacaoAsync(transacao);
            return Ok(result);
        }

        [HttpPut(TransacaoAPI.EditarTransacaoAsync)]
        public async Task<IActionResult> EditarTransacaoAsync([FromBody] Transacao transacao)
        {
            var result = await _service.EditarTransacaoAsync(transacao);
            return Ok(result);
        }

        [HttpDelete(TransacaoAPI.DeletarTransacaoAsync)]
        public async Task<IActionResult> DeletarTransacaoAsync([FromQuery] int transacaoId)
        {
            var result = await _service.DeletarTransacaoAsync(transacaoId);
            return Ok(result);
        }

        [HttpGet(TransacaoAPI.ObterTodasTransacoesAsync)]
        public async Task<IActionResult> ObterTodasTransacoesAsync()
        {
            var result = await _service.ObterTodasTransacoesAsync();
            return Ok(result);
        }

        [HttpGet(TransacaoAPI.ObterTransacaoPorIdAsync)]
        public async Task<IActionResult> ObterTransacaoPorIdAsync([FromQuery] int transacaoId)
        {
            var result = await _service.ObterTransacaoPorIdAsync(transacaoId);
            return Ok(result);
        }
    }
}
