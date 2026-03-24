using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Domain.DTOs
{
    public class JwtConfig
    {
        public string ChaveToken { get; set; } = string.Empty;
        public int ExpiracaoHoras { get; set; }
    }
}
