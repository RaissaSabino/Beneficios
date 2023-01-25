using System;
using Model;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace Controller.Controllers;

[ApiController]
[Route("stationProduct")]
public class StationProductController : ControllerBase
{
    [HttpPost]
    [Route("register")]
    public object registerStationProduct([FromBody] StationProductKeysDTO stationProduct)
    {
        Model.StationProduct.save(stationProduct);
        return new
        {
            Station = stationProduct.idStation,
            Product = stationProduct.idProdutos
        };
    }

    [HttpGet]
    [Route("getAll/{idStation}")]
    public object getInformations(int idStation)
    {
        var stationProduct = Model.StationProduct.findID(idStation);
        
        return stationProduct;
    }

    [HttpGet]
    [Route("getEvent/{ip}")]
    public object getEvent(string ip)
    {
        var stationProduct = Model.StationProduct.findEvento(ip);

        return stationProduct;
    }

    [HttpDelete]
    [Route("delete")]
    public object deleteStationProduct([FromBody] StationProductKeysDTO stationProductDelete )
    {
        Model.StationProduct.delete(stationProductDelete.idProdutos, stationProductDelete.idStation);
        return new
        {
            status = "ok",
            mensagem = "excluido"
        };
    }
}

