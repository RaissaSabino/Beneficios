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
[Route("beneficiary")]
public class BeneficiaryController : ControllerBase
{
    public IConfiguration _configuration;

    public BeneficiaryController(IConfiguration config){
        _configuration = config;
    }

    [HttpGet]
    [Route("getAll")]

    public object getAllInformations()
    {
        var beneficiarios = Model.Beneficiary.findAll();
        return beneficiarios;
    }

     [HttpPost]
    [Route("beneficiaryPesquisa")]
    public IActionResult GetTable([FromBody] PesquisaBeneficiary pesquisa)
    {
        var all = Beneficiary.PesquisaBeneficiary(pesquisa);
        var result = new ObjectResult(all);
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        return result;
    }

    [HttpGet]
    [Route("get/{edv}")]
    public object getInformations(string edv)
    {
        Console.WriteLine(edv);
        var beneficiary = Model.Beneficiary.findID(edv);
        return beneficiary;
    }

    [HttpGet]
    [Route("getcpf/{cpf}")]
    public object getCPF(string cpf)
    {
        Console.WriteLine(cpf);
        var beneficiary = Model.Beneficiary.findCPF(cpf);
        return beneficiary;
    }

    [HttpGet]
    [Route("getById")]

    public object getInformations()
    {
        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var user = Model.Beneficiary.findId(id);
        return user;
    }

    [HttpPost]
    [Route("register")]
    public object registerBeneficiary([FromBody] BeneficiaryDTO beneficiary)
    {
        var beneficiarys=Model.Beneficiary.convertDTOToModel(beneficiary);
        var id=beneficiarys.save();
        return new{
            name=beneficiary.Name,
            edv = beneficiary.Edv,
            cpf = beneficiary.Cpf,
            inclusionDate = beneficiary.InclusionDate,
            user = beneficiary.User,
            thirdParty = beneficiary.ThirdParty,
            area = beneficiary.Area,
            birthDate = beneficiary.BirthDate,
            id = id
        };
    }
        [HttpPost]
        [Route("register/third/{idevento}")]
        public int registerBeneficiaryThird([FromBody] BeneficiaryDTO beneficiary, int idevento)
        {
            var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
            var beneficiarys = Model.Beneficiary.convertDTOToModel(beneficiary);
            Console.WriteLine(id+idevento);
            var idnovo = beneficiarys.saveThirdParty(id,idevento);
            return idnovo;
        }
        [HttpPut]
        [Route("update/third/{idevento}/{idnovo}")]
        public int registerBeneficiaryThird(int idevento, int idnovo)
        {
            var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
            var beneficiarys = Model.Beneficiary.updateThird(idnovo,idevento,id);
            return beneficiarys;
        }
    
    [HttpPut]
    [Route("update")]
    public object editBeneficiary([FromBody] BeneficiaryDTO beneficiary)
    {
        Console.WriteLine("OIIIIIIIIIIIIIII");
        Model.Beneficiary.update(beneficiary);
        return new
        {
            status = "ok",
            mensagem = "deu boa"
        };
    }

    [HttpDelete]
    [Route("delete")]
    public object deleteBeneficiary([FromBody] BeneficiaryDTO beneficiaryDTO)
    {

        var beneficiaryDel = Model.Beneficiary.convertDTOToModel(beneficiaryDTO);
        Model.Beneficiary.delete(beneficiaryDel);
        return new
        {
            status = "ok",
            mensagem = "excluido"
        };
    }

    [HttpPost]
    [Route("login")]
    public IActionResult tokenGenerate([FromBody] BeneficiaryDTO login){
        if(login != null && login.Cpf != null && login.BirthDate != null){
            var user = Model.Beneficiary.findByUser(login.Cpf, login.BirthDate.ToString());
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            if(user != null){
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("UserName", user.Name.ToString()),
                    new Claim("EDV", user.Cpf.ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["JwtAudience"],
                    claims,
                    expires: DateTime.UtcNow.AddMinutes(10000),
                    signingCredentials: signIn);
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }
        else
        {
            return BadRequest("Empty credentials");
        }
    }
    [HttpPost]
    [Route("loginadm")]
    public IActionResult tokenGenerates([FromBody] BeneficiaryDTO login){
        if(login != null && login.Edv != null && login.BirthDate != null){
            var user = Model.Beneficiary.findByUserAdm(login.Edv, login.BirthDate.ToString());
            Response.Headers.Add("Access-Control-Allow-Origin", "*");
            if(user != null){
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("UserName", user.Name.ToString()),
                    new Claim("EDV", user.Cpf.ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["JwtAudience"],
                    claims,
                    expires: DateTime.UtcNow.AddHours(4),
                    signingCredentials: signIn);
                    Console.WriteLine(DateTime.UtcNow.AddSeconds(30));
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                
            }
            else
            {
                return BadRequest("Invalid credentials");
            }
        }
        else
        {
            return BadRequest("Empty credentials");
        }
    }


}
