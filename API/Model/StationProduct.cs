using DTO;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class StationProduct : IValidateDataObject, IDataController<StationProductDTO, StationProduct>
{
	private int id;
    private Station station;
    //private Product> products = new List<Product>();
    private Product produtos;

    public int Id { get => id; set => id = value; }
    public Station Station { get => station; set => station = value; }
    //public List<Product> Products { get => products;}
    public Product Produtos { get => produtos; set => produtos = value; }

    //public void addProductInStation(Product product)
    //{
    //    products.Add(product);
    //}

    public bool validateObject()
    {
        if (this.Station == null)
        {
            return false;
        }
        //if (this.products == null)
        //{
        //    return false;
        //}
        return true;
    }

    public static void save(StationProductKeysDTO stationProduct)
    {
        Console.WriteLine(stationProduct.idStation+ " " + stationProduct.idProdutos);
        using (var context = new Context())
        {
             var stationProductModel = new StationProduct
            {
                Station = context.station.FirstOrDefault(c => c.Id == stationProduct.idStation),
                Produtos = context.product.FirstOrDefault(s => s.Id == stationProduct.idProdutos)
            };

            context.stationProduct.Add(stationProductModel);
            context.SaveChanges();
        }
    }

    public StationProductDTO convertModelToDTO()
    {
        var stationProductDTO = new StationProductDTO();       
        stationProductDTO.Station = this.Station.convertModelToDTO();
        stationProductDTO.Product = this.Produtos.convertModelToDTO();
        return stationProductDTO;
    }

    public static StationProduct convertDTOToModel(StationProductDTO obj)
    {
        StationProduct stationProduct = new StationProduct();
        if(obj.Station != null)
        {
            stationProduct.station = Station.convertDTOToModel(obj.Station);
        }
        if (obj.Product != null)
        {
            stationProduct.produtos = Product.convertDTOToModel(obj.Product);
        }
        return stationProduct;
    }

    public static List<object> findID(int id)
    {
        using (var context = new Context())
        {
            Console.WriteLine("passou 1");
            var stationProduct = context.stationProduct.Where(d => d.Station.Id == id).Include(d => d.Station).Include(d => d.Produtos).Include(d => d.Produtos.Eventos);
            Console.WriteLine("passou 2");
            List<object> Produtos = new List<object>();

            foreach(var produto in stationProduct)
            {
                Produtos.Add(produto);
            }

            return Produtos;
        }
    }

    public static List<object> findEvento(string ip)
    {
        using (var context = new Context())
        {
            var stationProduct = context.stationProduct.Where(d => d.Station.IpAddress == ip).Include(e => e.Produtos).Include(e => e.Produtos.Eventos);

            List<object> estacos = new List<object>();

            foreach(var item in stationProduct)
            {
                estacos.Add(item);
            }

            return estacos;
        }
    }

    //public static List<object> findProdutos(int idBeneficiario, int idNomeado, string ip)
    //{
    //    using (var context = new Context())
    //    {
    //        var listona = context.eventsBeneficiary.Where(e => e.Beneficiario.Id == idBeneficiario && e.BeneficiarioNomeado.Id == idNomeado);

    //        var produtos = context.stationProduct.Where(d => d.Station.IpAddress == ip).Include(e => e.Produtos.Eventos);

    //        List<object> products = new List<object>();

    //        List<object> beneficiarios = new List<object>();

    //        foreach(var item in listona)
    //        {
    //            beneficiarios.Add(item);
    //        }

    //        foreach(var item in produtos)
    //        {
    //            products.Add(item);
    //        }

    //        foreach(var evento in beneficiarios)
    //        {
               
    //        }
    //    }
    //}

    public static void delete(int idProdutos, int idStation)
    {
        using (var context = new Context())
        {
            var stations = context.stationProduct.Where(i => i.Produtos.Id == idProdutos && i.Station.Id == idStation);

            foreach(var item in stations)
            {
                context.stationProduct.Remove(item);
            }

            context.SaveChanges();

  //          {
  //              "id": 20,
  //"station": {
  //                  "ipAddress": "",
  //  "isActive": true,
  //  "description": ""
  //},
  //"product": {
  //                  "name": "",
  //  "events": {
  //                      "name": "",
  //    "description": ""
  //  }
  //              }
  //          }
        }
    }

    public StationProductDTO findById(int id)
    {
        return new StationProductDTO();
    }

    public List<StationProductDTO> getAll() { return new List<StationProductDTO>(); }
}

