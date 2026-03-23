using MathNet.Numerics.Distributions;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Application.Services
{
    public class TransacaoService
    {
        private readonly ITransacaoRepository _repo;
        private readonly TokenDto _token;

        public TransacaoService(ITransacaoRepository repo, TokenDto token)
        {
            _repo = repo;
            _token = token;
        }
        public async Task<bool> CadastrarTransacaoAsync(Transacao transacao)
        {
            transacao.UsuarioId = _token.Id;
            var transacaoExiste = await _repo.TransacaoJaExiste(transacao.Id);
            if (transacaoExiste)
                throw new Exception("Transação já existe");

            var ret = await _repo.CadastrarTransacaoAsync(transacao);
            return ret;
        }
        public async Task<bool> DeletarTransacaoAsync(int transacaoId)
        {
            var transacaoExiste = await _repo.TransacaoJaExiste(transacaoId);
            if (!transacaoExiste)
                throw new Exception("Transação não encontrada");
            var ret = await _repo.DeletarTransacaoAsync(transacaoId);
            return ret;

        }
        public async Task<bool> EditarTransacaoAsync(Transacao transacao)
        {
            var transacaoExiste = await _repo.TransacaoJaExiste(transacao.Id);
            if (!transacaoExiste)
                throw new Exception("Transação não encontrada");

            var ret = await _repo.EditarTransacaoAsync(transacao);
            return ret;
        }

        public async Task<Transacao> ObterTransacaoPorIdAsync(int transacaoId)
        {
            var transacao = await _repo.ObterTransacaoPorIdAsync(transacaoId);
            if (transacao is null)
                throw new Exception("Transação não encontrada");
            return transacao;

        }

        public async Task<List<Transacao>> ObterTodasTransacoesAsync()
        {
            var listTransacoes = await _repo.ObterTodasTransacoesAsync();
            return listTransacoes;
        }
    }
}
