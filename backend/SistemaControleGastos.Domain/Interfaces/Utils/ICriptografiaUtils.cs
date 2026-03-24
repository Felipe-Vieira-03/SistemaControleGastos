using System;
using System.Collections.Generic;
using System.Text;

namespace SistemaControleGastos.Domain.Interfaces.Utils
{
    public interface ICriptografiaUtils
    {
        string EncryptString(string plainText);
        string DecryptString(string cipherText);
    }
}
