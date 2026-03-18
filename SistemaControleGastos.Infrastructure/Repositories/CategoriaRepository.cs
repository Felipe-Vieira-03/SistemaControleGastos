using Microsoft.EntityFrameworkCore;
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
        public async Task<bool> CadastrarCategoriaAsync(Categoria categoria)
        {
            var ret = _db.Categorias.Add(categoria);
            await _db.SaveChangesAsync();
            return ret is not null;
        }
        public async Task<bool> DeletarCategoriaAsync(int categoriaId)
        {
            var ret = await _db.Categorias.Where(w => w.Id == categoriaId).ExecuteDeleteAsync();
            return ret > 0;
        }

        public async Task<bool> EditarCategoriaAsync(Categoria categoria)
        {
            var ret = _db.Categorias.Update(categoria);
            await _db.SaveChangesAsync();
            return ret is not null;
        }

        public async Task<Categoria> ObterCategoriaPorIdAsync(int categoriaId)
        {
            var categoria = await _db.Categorias.Where(w => w.Id == categoriaId).FirstOrDefaultAsync();
            return categoria;
        }

        public async Task<List<Categoria>> ObterTodasCategoriasAsync()
        {
            var listCategorias = await _db.Categorias.ToListAsync();
            return listCategorias;
        }
        public async Task<bool> CategoriaJaExiste(int categoriaId)
        {
            return await _db.Categorias.AnyAsync(w => w.Id == categoriaId);
        }
    }
}
