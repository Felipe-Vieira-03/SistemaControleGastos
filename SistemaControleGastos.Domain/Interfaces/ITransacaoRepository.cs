using SistemaControleGastos.Domain.Entities;

namespace SistemaControleGastos.Domain.Interfaces
{
    public interface ITransacaoRepository
    {
        Task CadastrarTransacaoAsync(Transacao transacao);
        Task<bool> EditarTransacaoAsync(Transacao transacao);
        Task<bool> DeletarTransacaoAsync(int transacaoId);
        Task<List<Transacao>> ObterTodasTransacoesAsync();
        Task<Transacao> ObterTransacaoAsync(int transacaoid);
    }
}
