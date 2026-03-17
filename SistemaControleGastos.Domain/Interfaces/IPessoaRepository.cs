using SistemaControleGastos.Domain.Entities;

namespace SistemaControleGastos.Domain.Interfaces
{
    public interface IPessoaRepository
    {
        Task CadastrarPessoaAsync(Pessoa pessoa);
        Task<bool> EditarPessoaAsync(Pessoa pessoa);
        Task<bool> DeletarPessoaAsync(int pessoaId);
        Task<List<Pessoa>> ObterTodasPessoasAsync();
        Task<Pessoa> ObterPessoaAsync(int pessoaId);

    }
}
