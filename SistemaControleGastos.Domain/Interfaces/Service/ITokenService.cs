using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Domain.Interfaces.Service
{
    public interface ITokenService
    {
        string GerarToken(int id, string email, DateTime dataCadastro);

    }
}
