
using System;
using Model;
using DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
namespace Controller;

[ApiController]
[Route("eventsBeneficiaryProduct")]
public class EventsBeneficiaryProductController : ControllerBase
{

    // [HttpPost]
    // [Route("register")]
    // public object registerEventsBeneficiaryProduct([FromBody] EventsBeneficiaryProductDTO eventsBeneficiaryProduct) { 


    //     var eventBeneficiaryProduct = Model.EventsBeneficiaryProduct.convertDTOToModel(eventsBeneficiaryProduct);
    //     var id = eventBeneficiaryProduct.save(
    //         Model.EventsBeneficiaryProduct.getProductId(eventBeneficiaryProduct.Produto), 
    //         Model.EventsBeneficiaryProduct.getEventId(eventBeneficiaryProduct.EventosBeneficiario), 
    //         Model.EventsBeneficiaryProduct.getBeneficiaryId(eventBeneficiaryProduct.DeliveredBeneficiary)
    //         );

    //     return new
    //     {
    //         quantity = eventsBeneficiaryProduct.Quantity
    //         deliveredDate = eventsBeneficiaryProduct.DeliveredDate,
    //         eventosBeneficiario = eventsBeneficiaryProduct.EventsBeneficiary,
    //         produto = eventsBeneficiaryProduct.Product,
    //         deliveredBeneficiary = eventsBeneficiaryProduct.DeliveredBeneficiary,
    //         id = id
    //     };
    // }

    [HttpPost]
        [Route("register")]
        public void registerEventsBeneficiaryProduct([FromBody] RegisterEventBeneficiaryProductDTO eventsBeneficiaryProduct) { 
            Model.EventsBeneficiaryProduct.save(eventsBeneficiaryProduct);
        }




    [HttpPut]
    [Route("update/{id}")]
    public string updateProduct(EventsBeneficiaryProductDTO eventsBeneficiaryProduct, int id)
    {
        var product = Model.EventsBeneficiaryProduct.convertDTOToModel(eventsBeneficiaryProduct);
        product.update(eventsBeneficiaryProduct, id);
        return "alterado com sucesso!!";
    }


    [HttpGet]
    [Route("get/{idEvent}/{idBeneficiary}")]
    public object getInformations(int idEvent, int idBeneficiary)
    {
        var eventsbene = Model.EventsBeneficiaryProduct.findID(idEvent, idBeneficiary);
        return eventsbene;
    }

    [HttpGet]
    [Route("getcpf/{cpf}")]
    public object getCPF(string cpf)
    {
        var ip = Model.Station.getIp();

        var eventsbene = Model.EventsBeneficiaryProduct.findCPF(cpf, ip);
        return eventsbene;
    }

    [HttpGet]
    [Route("getedv/{edv}")]
    public object getEDV(string edv)
    {
        var ip = Model.Station.getIp();

        var eventsbene = Model.EventsBeneficiaryProduct.findEDV(edv, ip);
        return eventsbene;
    }

    [HttpGet]
    [Route("graficoGeral/{evento}")]
    public object graficoGeral(int evento)
    {
        var grafico = Model.EventsBeneficiaryProduct.GetAllGraph(evento);

        return grafico;
    }

    [HttpGet]
    [Route("getedvBeneficiario/{edv}")]
    public object getEDVBeneficiario(string edv)
    {
        var ip = Model.Station.getIp();

        var eventsbene = Model.EventsBeneficiaryProduct.findEDVBeneficiario(edv, ip);
        return eventsbene;
    }


    [HttpGet]
    [Route("get")]
    public object getProducts()
    {
        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var eventsbene = Model.EventsBeneficiaryProduct.findProducts(id);
        return eventsbene;
    }
    [HttpGet]
    [Route("getBenefits")]
    public object getProductsBenefits()
    {
        var id = Lib.GetIdFromRequest(Request.Headers["Authorization"].ToString());
        var eventsbene = Model.EventsBeneficiaryProduct.findProductsBeneficiary(id);
        return eventsbene;
    }

    [HttpDelete]
    [Route("delete")]
    public object deleteEventBeneficiaryProduct([FromBody] EventsBeneficiaryProductKeysDTO eventsBeneficiaryProduct)
    {
        Model.EventsBeneficiaryProduct.delete(eventsBeneficiaryProduct.idProduct, eventsBeneficiaryProduct.idEventBeneficiary);
        return new
        {
            status = "ok",
            mensagem = "excluido"
        };
    }


}