using SistemaControleGastos.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace SistemaControleGastos.Domain.Entities
{
    public class Categoria
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        [MaxLength(200)]
        public string DescricaoCategoria { get; set; }
        public EFinalidade Finalidade { get; set; }
    }
}
