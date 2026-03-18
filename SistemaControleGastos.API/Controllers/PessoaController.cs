using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace SistemaControleGastos.API.Controllers
{
    public class PessoaController :  BaseController
    {

        [HttpGet("Teste")]
        public async Task<IActionResult> Teste()
        {
            var result = true;
            return Ok(result);
        }
    }
}
