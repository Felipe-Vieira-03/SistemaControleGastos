using Microsoft.EntityFrameworkCore;
using SistemaControleGastos.Domain.DTOs;
using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;
using SistemaControleGastos.Infrastructure.Data;

namespace SistemaControleGastos.Infrastructure.Repositories
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly AppDbContext _db;
        public readonly TokenDto _token;

        public PessoaRepository(AppDbContext db, TokenDto token)
        {
            _db = db;
            _token = token;
        }

        public async Task<bool> CadastrarPessoaAsync(Pessoa pessoa)
        {
            var ret = _db.Pessoas.Add(pessoa);
            await _db.SaveChangesAsync();
            return ret is not null;
        }

        public async Task<bool> DeletarPessoaAsync(int pessoaId)
        {
            var ret = await _db.Pessoas.Where(w => w.UsuarioId == _token.Id && w.Id == pessoaId).ExecuteDeleteAsync();
            return ret > 0;
        }

        public async Task<bool> EditarPessoaAsync(Pessoa pessoa)
        {
            var ret = _db.Pessoas.Update(pessoa);
            await _db.SaveChangesAsync();
            return ret is not null;
        }

        public async Task<Pessoa> ObterPessoaPorIdAsync(int pessoaId)
        {
            var pessoa = await _db.Pessoas.Where(w => w.UsuarioId == _token.Id && w.Id == pessoaId).FirstOrDefaultAsync();
            return pessoa;
        }

        public async Task<List<Pessoa>> ObterTodasPessoasAsync()
        {
            var listPessoas = await _db.Pessoas.Where(w => w.UsuarioId == _token.Id).ToListAsync();
            return listPessoas;
        }
        public async Task<bool> PessoaJaExiste(int pessoaId)
        {
            return await _db.Pessoas.AnyAsync(w => w.UsuarioId == _token.Id && w.Id == pessoaId);            
        }
    }
}
