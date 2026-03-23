using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Domain.Entities
{
    public class Pessoa
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public string Nome { get; set; }
        public int Idade { get; set; }
    }
}
