using Microsoft.EntityFrameworkCore;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;
using SistemaControleGastos.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Infrastructure.Repositories
{
    public class TransacaoRepository : ITransacaoRepository
    {
        private readonly AppDbContext _db;

        public TransacaoRepository(AppDbContext db)
        {
            _db = db;

        }

        public async Task<bool> CadastrarTransacaoAsync(Transacao transacao)
        {
            var ret = _db.Transacoes.Add(transacao);
            await _db.SaveChangesAsync();
            return ret is not null;
        }

        public async Task<bool> DeletarTransacaoAsync(int transacaoId)
        {
            var ret = await _db.Transacoes.Where(w => w.Id == transacaoId).ExecuteDeleteAsync();
            return ret > 0;
        }

        public async Task<bool> EditarTransacaoAsync(Transacao transacao)
        {
            var ret = _db.Transacoes.Update(transacao);
            await _db.SaveChangesAsync();
            return ret is not null;
        }

        public async Task<Transacao> ObterTransacaoPorIdAsync(int transacaoid)
        {
            var transacao = await _db.Transacoes.Where(w => w.Id == transacaoid).FirstOrDefaultAsync();
            return transacao;
        }
        public async Task<List<Transacao>> ObterTodasTransacoesAsync()
        {
            var listTransacoes = await _db.Transacoes.ToListAsync();
            return listTransacoes;
        }

        public async Task<bool> TransacaoJaExiste(int transacaoId)
        {
            return await _db.Transacoes.AnyAsync(w => w.Id == transacaoId);
        }

    }
}
