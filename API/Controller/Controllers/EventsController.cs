using System;
using Model;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace Controller;

[ApiController]
[Route("events")]
public class EventsController : ControllerBase
{

    [HttpGet]
    [Route("getAll")]

    public object getAllInformations()
    {
        var events = Model.Events.findAll();
        return events;
    }

    [Authorize]
    [HttpPost]
    [Route("eventsPesquisa")]
    public IActionResult GetTable([FromBody] PesquisaEvents pesquisa)
    {
        var all = Events.GetTablePesquisa(pesquisa);
        var result = new ObjectResult(all);
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        return result;
    }


    [HttpGet]
    [Route("get/{id}")]
    public object getInformations(int id)
    {
        Console.WriteLine(id);
        var events = Model.Events.findID(id);
        return events;
    }
    [HttpPost]
    [Route("register")]
    public object registerEvents([FromBody] EventsDTO events)
    {
        var eventos = Model.Events.convertDTOToModel(events);
        var id = eventos.save();
        return new
        {
            name = events.name,
            description = events.description,
            startDate = events.startDate,
            endDate = events.endDate,
            isActive = events.isActive,
            id = id
        };
    }
    [Authorize]
    [HttpPut]
    [Route("update/{id}")]
    public object editEvents([FromBody] EventsDTO events, int id)
    {        
        Model.Events.update(events, id);
        return new
        {
            status = "Editado com sucesso",
        };
    }
    [HttpDelete]
    [Route("delete/{id}")]
    public object deleteEvents(int id)
    {
        Model.Events.delete(id);
        return new
        {
            status = "ok",
            mensagem = "excluido"
        };
    }
}
