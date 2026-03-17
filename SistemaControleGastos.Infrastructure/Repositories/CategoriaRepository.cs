using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;
using SistemaControleGastos.Infrastructure.Data;

namespace SistemaControleGastos.Infrastructure.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly AppDbContext _db;

        public CategoriaRepository(AppDbContext db)
        {
            _db = db;
        }

        public Task CadastrarCategoriaAsync(Categoria categoria)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeletarCategoriaAsync(int categoriaId)
        {
            throw new NotImplementedException();
        }

        public Task<bool> EditarCategoriaAsync(Categoria categoria)
        {
            throw new NotImplementedException();
        }

        public Task<Categoria> ObterCategoriaAsync(int categoriaId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Categoria>> ObterTodasCategoriasAsync()
        {
            throw new NotImplementedException();
        }
    }
}
