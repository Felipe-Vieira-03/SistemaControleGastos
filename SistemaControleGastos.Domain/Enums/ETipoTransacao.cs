using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace SistemaControleGastos.Domain.Enums
{
    public enum ETipoTransacao
    {
        [Description("Despesa")]
        Despesa = 1,

        [Description("Receita")]
        Receita = 1,

    }
}
