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

        public Task CadastrarTransacaoAsync(Transacao transacao)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletarTransacaoAsync(int transacaoId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> EditarTransacaoAsync(Transacao transacao)
        {
            throw new NotImplementedException();
        }

        public Task<List<Transacao>> ObterTodasTransacoesAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Transacao> ObterTransacaoAsync(int transacaoid)
        {
            throw new NotImplementedException();
        }
    }
}
