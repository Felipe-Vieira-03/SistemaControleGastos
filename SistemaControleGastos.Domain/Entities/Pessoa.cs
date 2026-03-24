using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace SistemaControleGastos.Domain.Entities
{
    public class Pessoa
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        [MaxLength(200)]
        public string Nome { get; set; }
        public int Idade { get; set; }
    }
}
