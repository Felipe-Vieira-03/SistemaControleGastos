using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Domain.DTOs
{
    public class TokenDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;
    }
}
