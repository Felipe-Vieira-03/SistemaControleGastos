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

        public TransacaoService(ITransacaoRepository repo)
        {
            _repo = repo;
        }
        public async Task<bool> CadastrarTransacaoAsync(Transacao Transacao)
        {
            var TransacaoExiste = await _repo.TransacaoJaExiste(Transacao.Id);
            if (TransacaoExiste)
                throw new Exception("Transação já existe");

            var ret = await _repo.CadastrarTransacaoAsync(Transacao);
            return ret;
        }
        public async Task<bool> DeletarTransacaoAsync(int TransacaoId)
        {
            var TransacaoExiste = await _repo.TransacaoJaExiste(TransacaoId);
            if (!TransacaoExiste)
                throw new Exception("Transação não encontrada");
            var ret = await _repo.DeletarTransacaoAsync(TransacaoId);
            return ret;

        }
        public async Task<bool> EditarTransacaoAsync(Transacao Transacao)
        {
            var TransacaoExiste = await _repo.TransacaoJaExiste(Transacao.Id);
            if (!TransacaoExiste)
                throw new Exception("Transação não encontrada");

            var ret = await _repo.EditarTransacaoAsync(Transacao);
            return ret;
        }

        public async Task<Transacao> ObterTransacaoPorIdAsync(int TransacaoId)
        {
            var Transacao = await _repo.ObterTransacaoPorIdAsync(TransacaoId);
            if (Transacao is null)
                throw new Exception("Transação não encontrada");
            return Transacao;

        }

        public async Task<List<Transacao>> ObterTodasTransacoesAsync()
        {
            var listTransacoes = await _repo.ObterTodasTransacoesAsync();
            return listTransacoes;
        }
    }
}
