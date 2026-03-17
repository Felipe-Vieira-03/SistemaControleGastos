using SistemaControleGastos.Domain.Entities;

namespace SistemaControleGastos.Domain.Interfaces
{
    public interface ICategoriaRepository
    {
       Task CadastrarCategoriaAsync(Categoria categoria);
       Task<bool> EditarCategoriaAsync(Categoria categoria);
       Task<bool> DeletarCategoriaAsync(int categoriaId);
       Task<List<Categoria>> ObterTodasCategoriasAsync();
       Task<Categoria> ObterCategoriaAsync(int categoriaId);
    }
}
