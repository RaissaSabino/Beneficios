using System;
using Model;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace Controller;

[ApiController]
[Route("station")]
public class StationController : ControllerBase
{

    [HttpGet]
    [Route("getAll")]

    public object getAllInformations()
    {
        var stations = Model.Station.findAll();
        return stations;
    }

      [HttpPost]
    [Route("stationPesquisa")]
    public IActionResult GetTable([FromBody] PesquisaStation pesquisa)
    {
        var all = Station.PesquisaStation(pesquisa);
        var result = new ObjectResult(all);
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        return result;
    }




    [HttpGet]
    [Route("get/{id}")]
    public object getInformations(int id)
    {
        Console.WriteLine(id);
        var station = Model.Station.findID(id);
        return station;
    }
    [HttpPost]
    [Route("register")]
    public object registerStation([FromBody] StationDTO station)
    {
        var stationId  = Station.save(station);
        return new
        {
            stationId = stationId
        };
    }
    [HttpPut]
    [Route("update")]
    public object editStation([FromBody] StationDTO station)
    {
        Model.Station.update(station);
        return new
        {
            status = "ok"
        };
    }
    [HttpDelete]
    [Route("delete")]
        public object deleteStation([FromBody]StationDTO stationDTO){
            
            var stationdel=Model.Station.convertDTOToModel(stationDTO);
            Model.Station.delete(stationdel);
                return new {
                        status = "ok",
                        mensagem = "excluido"
                };
        }


}
