using System;
using Model;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace Controller;

[ApiController]
[Route("stock")]
public class StockController : ControllerBase
{
    [HttpGet]
    [Route("get/{id}")]
    public object getInformations(int id)
    {
        var stock = Model.Stock.FindProductID(id);
        return stock;
    }

    [HttpGet]
    [Route("getAll")]
    public object getInformations()
    {
        var product = Model.Stock.findAll();
        return product;
    }

    [HttpPost]
    [Route("register")]
    public void registerProduct([FromBody] RegisterStock stock)
    {
        Model.Stock.save(stock);
    }
    [HttpPut]
    [Route("update/{idProduct}")]
    public string updateProduct(StockDTO stockDTO, int idProduct)
    {
        var stock = Model.Stock.convertDTOToModel(stockDTO);
        stock.update(stockDTO, idProduct);
        return "alterado com sucesso!!";
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public object deleteProduct(int id)
    {
        Model.Stock.delete(id);
        return new
        {
            mensagem = "Excluido com sucesso"
        };
    }
}
