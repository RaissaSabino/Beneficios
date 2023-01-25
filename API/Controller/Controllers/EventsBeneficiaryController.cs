
using System;
using Model;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace Controller;

[ApiController]
[Route("eventsbeneficiary")]
public class EventsBeneficiaryController : ControllerBase
{

    [HttpPost]
    [Route("register")]
    public object registerEventsBeneciary([FromBody] EventsBeneficiaryKeysDTO eventsbeneficiary)
    {
        
        
        int EventsID = eventsbeneficiary.idEvento;
        int BeneficiaryID = Model.Beneficiary.FindBeneficiaryID(eventsbeneficiary.edvBeneficiary);

        Console.WriteLine(EventsID);
        Console.WriteLine(BeneficiaryID);
        var Id = Model.EventsBeneficiary.save(EventsID, BeneficiaryID);


        return new
        {
            id = Id,
            Event = EventsID,
            Beneficiary = BeneficiaryID
        };
    }


    [HttpGet]
    [Route("get/{idEvento}")]
    public object getInformations(int idEvento)
    {
        var eventsbene = Model.EventsBeneficiary.findID(idEvento);
        return eventsbene;
    }

    [HttpPost]
    [Route("beneficiaryPesquisa")]
    public IActionResult GetTable([FromBody] PesquisaBeneficiary pesquisa)
    {
        var all = Model.EventsBeneficiary.PesquisaBeneficiary(pesquisa);
        var result = new ObjectResult(all);
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        return result;
    }

    [HttpGet]
    [Route("getAll")]

    public object getInformations()
    {
        var beneficiarios = Model.EventsBeneficiary.findAll();

        return beneficiarios;
    }

    [HttpGet]
    [Route("getById")]
    public object getid()
    {
        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var eventsbene = Model.EventsBeneficiary.findId(id);
        return eventsbene;
    }

    [HttpGet]
    [Route("getcpf/{cpf}")]
    public object getCPF(string cpf)
    {
        var beneficiary = Model.EventsBeneficiary.findCPF(cpf);
        return beneficiary;
    }
    [HttpPut]
    [Route("update/thirdEDV/{idevento}/{idnovo}")]
    public int registerBeneficiaryThird(int idevento, int idnovo)
    {
        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var beneficiarys = Model.Beneficiary.updateThird(idnovo,idevento,id);
        return beneficiarys;
    }
    [HttpGet]
    [Route("getedv/{edv}")]
    public object getEDV(string edv)
    {
        var beneficiary = Model.EventsBeneficiary.findEDV(edv);
        return beneficiary;
    }

    [HttpGet]
    [Route("getcpfBeneficiario/{edv}")]
    public object getCPFBeneficiario(string edv)
    {
        var beneficiary = Model.EventsBeneficiary.findCPFBeneficiario(edv);
        return beneficiary;
    }


    [HttpDelete]
    [Route("delete")]
    public object deleteEventBeneficiary([FromBody] EventsBeneficiaryKeysDTO eventsBeneficiary)
    {
        Console.WriteLine(eventsBeneficiary.idEvento);
        Console.WriteLine(eventsBeneficiary.edvBeneficiary);
        Model.EventsBeneficiary.delete(eventsBeneficiary.idEvento, eventsBeneficiary.edvBeneficiary);
        return new
        {
            status = "ok",
            mensagem = "excluido"
        };
    }


}