using System;
using Model;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace Controller;

[ApiController]
[Route("product")]
public class ProductController : ControllerBase
{
    [HttpGet]
    [Route("get/{id}")]
    public object getInformations(int id)
    {
        Console.WriteLine(id);
        var product = Model.Product.findID(id);
        return product;
    }

    [HttpGet]
    [Route("getAll")]
    public object getInformations()
    {
        var product = Model.Product.findAll();
        return product;
    }


    [HttpPost]
    [Route("productEventsPesquisa")]
    public IActionResult GetTable([FromBody] PesquisaProductsEvents pesquisa)
    {
        var all = Product.PesquisaProductEvent(pesquisa);
        var result = new ObjectResult(all);
        Response.Headers.Add("Access-Control-Allow-Origin", "*");
        return result;
    }

    [HttpPost]
    [Route("register")]
    public  int registerProduct([FromBody] RegisterProduct product)
    {
        var id = Model.Product.save(product);
        return id;
    }
    [HttpPut]
    [Route("update/{id}")]
    public string updateProduct(ProductDTO productDTO, int id)
    {
        var product = Model.Product.convertDTOToModel(productDTO);
        product.update(productDTO,id);
        return "alterado com sucesso!!";
    }

    [HttpDelete]
    [Route("delete/{id}")]
    public object deleteProduct(int id)
    {
        Model.Product.delete(id);
        return new
        {
            mensagem = "Excluido com sucesso"
        };
    }
}
