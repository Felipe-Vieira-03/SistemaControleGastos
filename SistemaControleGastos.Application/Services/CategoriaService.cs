using SistemaControleGastos.Domain.Entities;
using SistemaControleGastos.Domain.Interfaces;


namespace SistemaControleGastos.Application.Services
{
    public class CategoriaService
    {
        private readonly ICategoriaRepository _repo;
        public CategoriaService(ICategoriaRepository repo)
        {
            _repo = repo;
        }

        public async Task<bool> CadastrarCategoriaAsync(Categoria categoria)
        {
            var categoriaExiste = await _repo.CategoriaJaExiste(categoria.Id);
            if (categoriaExiste)
                throw new Exception("Categoria já existe");

            var ret = await _repo.CadastrarCategoriaAsync(categoria);
            return ret;
        }
        public async Task<bool> DeletarCategoriaAsync(int categoriaId)
        {
            var categoriaExiste = await _repo.CategoriaJaExiste(categoriaId);
            if (!categoriaExiste)
                throw new Exception("Categoria não encontrada");
            var ret = await _repo.DeletarCategoriaAsync(categoriaId);
            return ret;

        }

        public async Task<bool> EditarCategoriaAsync(Categoria categoria)
        {
            var categoriaExiste = await _repo.CategoriaJaExiste(categoria.Id);
            if (!categoriaExiste)
                throw new Exception("Categoria não encontrada");

            var ret = await _repo.EditarCategoriaAsync(categoria);
            return ret;
        }

        public async Task<Categoria> ObterCategoriaPorIdAsync(int categoriaId)
        {
            var Categoria = await _repo.ObterCategoriaPorIdAsync(categoriaId);
            if (Categoria is null)
                throw new Exception("Categoria não encontrada");
            return Categoria;

        }

        public async Task<List<Categoria>> ObterTodasCategoriasAsync()
        {
            var listCategorias = await _repo.ObterTodasCategoriasAsync();
            return listCategorias;
        }
    }
}
