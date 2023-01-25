using DTO;
using Microsoft.EntityFrameworkCore;

namespace Model;

public class Product : IValidateDataObject, IDataController<ProductDTO, Product>
{
    private int id;
    private string name;
    private decimal unitCost;
    private Events eventos;

    public int Id { get => id; set => id = value; }
    public string Name { get => name; set => name = value; }
    public decimal UnitCost { get => unitCost; set => unitCost = value; }
    public Events Eventos { get => eventos; set => eventos = value; }

    //public void addEventsInProduct(Events eventss)
    //{
    //    events.Add(eventss);
    //}

    public bool validateObject()
    {
        if (this.name == null)
        {
            return false;
        }
        if( this.unitCost == null)
        {
            return false;
        }
        //if (this.events == null)
        //{
        //    return false;
        //}
        return true;
    }


    public ProductDTO convertModelToDTO()
    {
        var productDTO = new ProductDTO();
        productDTO.Name = this.Name;
        productDTO.UnitCost = this.UnitCost;
        productDTO.Events = this.Eventos.convertModelToDTO();              
        return productDTO;
    }

    public static Product convertDTOToModel(ProductDTO obj)
    {
        Product product = new Product();
        product.Name = obj.Name;
        product.UnitCost = obj.UnitCost;
        if (obj.Events != null)
        {
            product.eventos = Events.convertDTOToModel(obj.Events);
        }
        return product;
    }

    public static int save(RegisterProduct product)
    {
        using (var context = new Context())
        {
            var produto = new Product()
            {
                name = product.name,
                unitCost = product.unitCost,
                eventos = context.events.Where(c => c.Id == product.eventid).Single()
            };

            context.product.Add(produto);
            if(produto.Eventos != null)
            {
                context.Entry(produto.Eventos).State = Microsoft.EntityFrameworkCore.EntityState.Unchanged;
            }
            context.SaveChanges();
            return produto.id;
        }
        
        

    }

    public void update(ProductDTO productDTO, int id)
    {
        using(var context = new Context())
        {            
            var product = context.product.FirstOrDefault(s => s.Id == id);
            if(product != null)
            {
                if(productDTO.Name != null)
                {
                    product.Name = productDTO.Name;
                }
                if(productDTO.UnitCost != null)
                {
                    product.UnitCost = productDTO.UnitCost;
                }
            }                        
            context.SaveChanges();
        }
    }

    public static List<object> findID(int id)
    {
        using(var context = new Context())
        {            
            var product = context.product.Include(p => p.Eventos).Where(d => d.Id == id);
            List<Object> produto = new List<object>();

            foreach(var produc in product)
            {
                produto.Add(produc);
            }
            return produto;
        }
    }

    public static List<object> findAll()
    {
        using (var context = new Context())
        {
            var product = context.product.Include(p => p.Eventos);

            List<object> produtos = new List<object>();

            foreach(var produto in product)
            {
                produtos.Add(produto);
            }

            return produtos;
        }
    }


    public static IEnumerable<object> PesquisaProductEvent(PesquisaProductsEvents pesquisa)
    {
        using (var context = new Context())
        {
            var produtos = context.product.Include(e=>e.Eventos).ToList();
            if (pesquisa.eventId != "") produtos = produtos.Where(e => e.eventos.Id == (int.Parse(pesquisa.eventId))).ToList();


            return produtos;
        }
    }

    public static IEnumerable<object> PesquisaProduct(PesquisaProducts pesquisa)
    {
        using (var context = new Context())
        {
            var produtos = context.product.Include(e=>e.Eventos).ToList();
            if(pesquisa.name != "") produtos = produtos.Where(e=>e.Name.ToLower().Contains(pesquisa.name.ToLower())).ToList();


            return produtos;
        }
    }


    public static int getEventId(Events events)
    {
        int id;
        using(var context = new Context())
        {
            var evento = context.events.FirstOrDefault(i => i.Name == events.Name);
            id = evento.Id;
        }
        return id;
    }

    public static void delete(int id)
    {
        using (var context = new Context())
        {
            var stationProduct = context.stationProduct.Include(c => c.Produtos).Include(d => d.Station).Where(c => c.Produtos.Id == id);
            var products = context.product.Where(i => i.Id == id);            

            foreach(var stationProduto in stationProduct)
            {
                context.stationProduct.Remove(stationProduto);
            }
            foreach(var produtos in products)
            {
                context.product.Remove(produtos);
            }
            
            context.SaveChanges();
        }
    }

    public ProductDTO findById(int id)
    {
        return new ProductDTO();
    }
    public static int FindProductID(string name)
    {
        using (var context = new Context())
        {
            var product = context.product.FirstOrDefault(s => s.Name == name);
            return product.id;
        }
    }

    public List<ProductDTO> getAll() { return new List<ProductDTO>(); }
}
