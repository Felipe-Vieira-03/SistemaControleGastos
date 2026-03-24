using SistemaControleGastos.Domain.Entities;

namespace SistemaControleGastos.Domain.Interfaces
{
    public interface ITransacaoRepository
    {
        Task<bool> CadastrarTransacaoAsync(Transacao transacao);
        Task<bool> EditarTransacaoAsync(Transacao transacao);
        Task<bool> DeletarTransacaoAsync(int transacaoId);
        Task<List<Transacao>> ObterTodasTransacoesAsync();
        Task<Transacao> ObterTransacaoPorIdAsync(int transacaoid);
        Task<bool> TransacaoJaExiste(int transacaoId);
    }
}
