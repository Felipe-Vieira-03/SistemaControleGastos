using SistemaControleGastos.Domain.Enums;

namespace SistemaControleGastos.Domain.Entities
{
    public class Categoria
    {
        public int Id { get; set; }
        public string DescricaoCategoria { get; set; }
        public EFinalidade Finalidade { get; set; }
    }
}
