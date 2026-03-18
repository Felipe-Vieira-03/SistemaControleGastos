using SistemaControleGastos.Domain.Entities;

namespace SistemaControleGastos.Domain.Interfaces
{
    public interface ICategoriaRepository
    {
       Task<bool> CadastrarCategoriaAsync(Categoria categoria);
       Task<bool> EditarCategoriaAsync(Categoria categoria);
       Task<bool> DeletarCategoriaAsync(int categoriaId);
       Task<List<Categoria>> ObterTodasCategoriasAsync();
       Task<Categoria> ObterCategoriaPorIdAsync(int categoriaId);
       Task<bool> CategoriaJaExiste(int categoriaId);

    }
}
