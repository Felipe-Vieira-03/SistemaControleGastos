using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace SistemaControleGastos.Domain.Enums
{
    public enum EFinalidade
    {
        [Description("Despesa")]
        Despesa = 1,

        [Description("Receita")]
        Receita = 2,

        [Description("Ambas")]
        Ambas = 3,
    }
}
