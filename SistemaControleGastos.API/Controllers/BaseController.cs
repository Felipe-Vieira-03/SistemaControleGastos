using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaControleGastos.Domain;
using SistemaControleGastos.Domain.DTOs;

namespace SistemaControleGastos.API.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class BaseController : ControllerBase
{

    public readonly TokenDto _token;

    public BaseController(IHttpContextAccessor context, TokenDto token)
    {
        _token = token;
    }
}

