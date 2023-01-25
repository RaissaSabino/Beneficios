using DTO;
using Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace Controller.Controllers;

[ApiController]
[Route("badge")]
public class BadgeController : ControllerBase
{
    public IConfiguration _configuration;

    public BadgeController(IConfiguration config)
    {
        _configuration = config;
    }

    [HttpGet]
    [Route("getEDV/{code}")]

    public object getAllInformations(string code)
    {
        var beneficiarios = Model.Badge.GetEdvByCode(code);
        return beneficiarios;
    }

    
}
