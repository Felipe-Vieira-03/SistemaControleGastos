using SistemaControleGastos.Domain.Entities;

namespace SistemaControleGastos.Domain.Interfaces
{
    public interface IPessoaRepository
    {
        Task<bool> CadastrarPessoaAsync(Pessoa pessoa);
        Task<bool> EditarPessoaAsync(Pessoa pessoa);
        Task<bool> DeletarPessoaAsync(int pessoaId);
        Task<List<Pessoa>> ObterTodasPessoasAsync();
        Task<Pessoa> ObterPessoaPorIdAsync(int pessoaId);
        Task<bool> PessoaJaExiste(int pessoaId);

    }
}
