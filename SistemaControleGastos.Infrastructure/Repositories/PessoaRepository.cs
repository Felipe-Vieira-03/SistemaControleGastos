using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;
using SistemaControleGastos.Infrastructure.Data;

namespace SistemaControleGastos.Infrastructure.Repositories
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly AppDbContext _db;
        public PessoaRepository(AppDbContext db)
        {
            _db = db;
        }

        public Task CadastrarPessoaAsync(Pessoa pessoa)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletarPessoaAsync(int pessoaId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> EditarPessoaAsync(Pessoa pessoa)
        {
            throw new NotImplementedException();
        }

        public Task<Pessoa> ObterPessoaAsync(int pessoaId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Pessoa>> ObterTodasPessoasAsync()
        {
            throw new NotImplementedException();
        }
    }
}
