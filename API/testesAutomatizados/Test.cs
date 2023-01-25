using NUnit.Framework;
using System.Collections.Generic;
using System;
using DTO;
using System.Linq;
using Model;
using System.Threading;

namespace testesAutomatizados;

public class Test
{
    public void AinsertEvent()
    {
        var id = 0;

        var eventsDTO = new EventsDTO();

        eventsDTO.Name = "evento 1";

        eventsDTO.Description = "descricao evento 1";

        eventsDTO.StartDate = new DateTime(2002, 5, 1, 8, 30, 30);

        eventsDTO.EndDate = new DateTime(2002, 5, 1, 8, 30, 30);

        eventsDTO.IsActive = true;

        var eventsModel = Model.Events.convertDTOToModel(eventsDTO);

        if (eventsModel.validateObject())
        {
            id = eventsModel.save();
        }

        Assert.That(id, Is.Not.EqualTo(0));
    }
    public void BinsertBeneficiary()
    {
        var id = 0;

        var beneficiaryDTO = new BeneficiaryDTO();

        beneficiaryDTO.Name = "KIam1";

        beneficiaryDTO.Edv = "78845747";

        beneficiaryDTO.Cpf = "87754842269";

        beneficiaryDTO.InclusionDate = new DateTime(2010, 5, 1, 8, 30, 30);

        beneficiaryDTO.User = "kiamct";

        beneficiaryDTO.ThirdParty = false;

        beneficiaryDTO.Area = "INOVE";

        beneficiaryDTO.BirthDate = new DateTime(2002, 5, 1, 8, 30, 30);

        var beneficiaryModel = Model.Beneficiary.convertDTOToModel(beneficiaryDTO);

        if (beneficiaryModel.validateObject())
        {
            id = beneficiaryModel.save();
        }

        Assert.That(id, Is.Not.EqualTo(0));
    }
    public void CinsertProduct()
    {
        var id = 0;

        var eventsDTO = new EventsDTO();

        eventsDTO.Name = "evento Product 1";

        eventsDTO.Description = "descricao evento Product 1";

        eventsDTO.StartDate = new DateTime(2002, 5, 1, 8, 30, 30);

        eventsDTO.EndDate = new DateTime(2003, 5, 1, 8, 30, 30);

        eventsDTO.IsActive = true;

        var productDTO = new ProductDTO();

        productDTO.Name = "Cesta";

        productDTO.Events.Add(eventsDTO);

   

        var productModel = Model.Product.convertDTOToModel(productDTO);

        if (productModel.validateObject())
        {
            id = productModel.save();
        }

        Assert.That(id, Is.Not.EqualTo(0));
    }
    public void DinsertStation()
    {
        var id = 0;

        var stationDTO = new StationDTO();

        stationDTO.IpAddress = "104.874.54.78";

        stationDTO.Description = "descricao evento 1";

        stationDTO.IsActive = true;

        var stationModel = Model.Station.convertDTOToModel(stationDTO);

        if (stationModel.validateObject())
        {
            id = stationModel.save();
        }

        Assert.That(id, Is.Not.EqualTo(0));
    }

    public void EinsertEventsBeneficiaary()
    {
        var beneficiaryDTO = new BeneficiaryDTO();

        beneficiaryDTO.Name = "KIam1";

        beneficiaryDTO.Edv = "78845747";

        beneficiaryDTO.Cpf = "87754842269";

        beneficiaryDTO.InclusionDate = new DateTime(2010, 5, 1, 8, 30, 30);

        beneficiaryDTO.User = "kiamct";

        beneficiaryDTO.ThirdParty = false;

        beneficiaryDTO.Area = "INOVE";

        beneficiaryDTO.BirthDate = new DateTime(2002, 5, 1, 8, 30, 30);

        var eventsDTO = new EventsDTO();

        eventsDTO.Name = "evento Product 1";

        eventsDTO.Description = "descricao evento Product 1";

        eventsDTO.StartDate = new DateTime(2006, 5, 1, 8, 30, 30);

        eventsDTO.EndDate = new DateTime(2007, 5, 1, 8, 30, 30);

        eventsDTO.IsActive = true;

        var id = 0;

        var eventsBeneficiaryDTO = new EventsBeneficiaryDTO();

        eventsBeneficiaryDTO.Evento = eventsDTO;

        eventsBeneficiaryDTO.Beneficiary.Add(beneficiaryDTO);

        eventsBeneficiaryDTO.BeneficiaryNominees.Add(null);

        var eventsBeneficiaryModel = Model.EventsBeneficiary.convertDTOToModel(eventsBeneficiaryDTO);

        if (eventsBeneficiaryModel.validateObject())
        {
            id = eventsBeneficiaryModel.save();
        }

        Assert.That(id, Is.Not.EqualTo(0));
    }

    public void FinsertEventsBeneficiaaryProduct()
    {
        var beneficiaryDTO = new BeneficiaryDTO();

        beneficiaryDTO.Name = "KIam1";

        beneficiaryDTO.Edv = "78845747";

        beneficiaryDTO.Cpf = "87754842269";

        beneficiaryDTO.InclusionDate = new DateTime(2010, 5, 1, 8, 30, 30);

        beneficiaryDTO.User = "kiamct";

        beneficiaryDTO.ThirdParty = false;

        beneficiaryDTO.Area = "INOVE";

        beneficiaryDTO.BirthDate = new DateTime(2002, 5, 1, 8, 30, 30);

        var eventsDTO = new EventsDTO();

        eventsDTO.Name = "evento Product 1";

        eventsDTO.Description = "descricao evento Product 1";

        eventsDTO.StartDate = new DateTime(2006, 5, 1, 8, 30, 30);

        eventsDTO.EndDate = new DateTime(2007, 5, 1, 8, 30, 30);

        eventsDTO.IsActive = true;

        var productDTO = new ProductDTO();

        productDTO.Name = "Cesta";

        productDTO.Events.Add(eventsDTO);

        var id = 0;

        var eventsBeneficiaryDTO = new EventsBeneficiaryDTO();

        eventsBeneficiaryDTO.Evento = eventsDTO;

        eventsBeneficiaryDTO.Beneficiary.Add(beneficiaryDTO);

        eventsBeneficiaryDTO.BeneficiaryNominees.Add(null);

        var eventsBeneficiaryProductDTO = new EventsBeneficiaryProductDTO();

        eventsBeneficiaryProductDTO.EventsBeneficiary.Add(eventsBeneficiaryDTO);

        eventsBeneficiaryProductDTO.Quantity = 4;

        eventsBeneficiaryProductDTO.UnitCost = 2;

        eventsBeneficiaryProductDTO.DeliveredDate = new DateTime(2007, 5, 1, 8, 30, 30);

        eventsBeneficiaryProductDTO.Product.Add(productDTO);

        eventsBeneficiaryProductDTO.DeliveredBeneficiary = beneficiaryDTO;

        var eventsBeneficiaryProductModel = Model.EventsBeneficiaryProduct.convertDTOToModel(eventsBeneficiaryProductDTO);

        if (eventsBeneficiaryProductModel.validateObject())
        {
            id = eventsBeneficiaryProductModel.save();
        }

        Assert.That(id, Is.Not.EqualTo(0));
    }

    public void GinsertStationProduct()
    {
        var id = 0;

        var stationDTO = new StationDTO();

        stationDTO.IpAddress = "104.874.54.78";

        stationDTO.Description = "descricao evento 1";

        stationDTO.IsActive = true;

        var eventsDTO = new EventsDTO();

        eventsDTO.Name = "evento Product 1";

        eventsDTO.Description = "descricao evento Product 1";

        eventsDTO.StartDate = new DateTime(2006, 5, 1, 8, 30, 30);

        eventsDTO.EndDate = new DateTime(2007, 5, 1, 8, 30, 30);

        eventsDTO.IsActive = true;

        var productDTO = new ProductDTO();

        productDTO.Name = "Cesta";

        productDTO.Events.Add(eventsDTO);

        var stationProductDTO = new StationProductDTO();

        stationProductDTO.Product.Add(productDTO);

        stationProductDTO.Station = stationDTO;

        var stationProductModel = Model.StationProduct.convertDTOToModel(stationProductDTO);

        if (stationProductModel.validateObject())
        {
            id = stationProductModel.save();
        }

        Assert.That(id, Is.Not.EqualTo(0));
    }
}
