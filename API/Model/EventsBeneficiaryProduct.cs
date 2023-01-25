using DTO;
using Microsoft.EntityFrameworkCore;

namespace Model;
public class EventsBeneficiaryProduct : IValidateDataObject, IDataController<EventsBeneficiaryProductDTO, EventsBeneficiaryProduct>
{
    private int id;
    private int quantity;
    // private int quantityT;
    private DateTime deliveredDate;
	//private List<EventsBeneficiary> eventsBeneficiary = new List<EventsBeneficiary>();
    private EventsBeneficiary eventosBeneficiario;
    //private Product product;
    private Product produto;
	private Beneficiary deliveredBeneficiary;
    private int deliveredQuantity;

    public int Id { get => id; set => id = value; }
    public int Quantity { get => quantity; set => quantity = value; }

    public int DeliveredQuantity { get => deliveredQuantity; set => deliveredQuantity = value; }

    // public int QuantityT { get => quantityT; set => quantityT = value; }
    public DateTime DeliveredDate { get => deliveredDate; set => deliveredDate = value; }    
    public Beneficiary DeliveredBeneficiary { get => deliveredBeneficiary; set => deliveredBeneficiary = value; }
    //public List<EventsBeneficiary> EventsBeneficiarys { get => eventsBeneficiary;}
    public EventsBeneficiary EventosBeneficiario { get => eventosBeneficiario; set => eventosBeneficiario = value; }
    //public Product Products { get => product;}
    public Product Produto { get => produto; set => produto = value; }

    //public void addEventsBeneficiaryInThis(EventsBeneficiary eventosBeneficiario)
    //{
    //    this.eventsBeneficiary.Add(eventosBeneficiario);
    //}
    //public void addProductInThis(Product produto)
    //{
    //    this.product.Add(produto);
    //}
    //teste de edição

    public bool validateObject()
    {
        if (this.quantity == null)
        {
            return false;
        }
        if (this.deliveredDate == null)
        {
            return false;
        }
        if(this.deliveredQuantity == null)
        {
            return false;
        }
        //if (this.eventsBeneficiary == null)
        //{
        //    return false;
        //}
        //if (this.product == null)
        //{
        //    return false;
        //}
        if (this.deliveredBeneficiary == null)
        {
            return false;
        }
        return true;
    }

    public EventsBeneficiaryProductDTO convertModelToDTO()
    {
        var eventsBeneficiaryProductDTO = new EventsBeneficiaryProductDTO();
        eventsBeneficiaryProductDTO.Quantity = this.Quantity;
        // eventsBeneficiaryProductDTO.QuantityT = this.QuantityT;
        eventsBeneficiaryProductDTO.DeliveredDate = this.DeliveredDate;
        eventsBeneficiaryProductDTO.DeliveredQuantity = this.DeliveredQuantity;
        eventsBeneficiaryProductDTO.EventsBeneficiary = this.EventosBeneficiario.convertModelToDTO(); ;
        eventsBeneficiaryProductDTO.Product = this.Produto.convertModelToDTO();
        eventsBeneficiaryProductDTO.DeliveredBeneficiary = this.deliveredBeneficiary.convertModelToDTO();
        return eventsBeneficiaryProductDTO;
    }

    public static EventsBeneficiaryProduct convertDTOToModel(EventsBeneficiaryProductDTO obj)
    {
        EventsBeneficiaryProduct eventsBeneficiaryProduct = new EventsBeneficiaryProduct();
        eventsBeneficiaryProduct.Quantity = obj.Quantity;
        // eventsBeneficiaryProduct.QuantityT = obj.QuantityT;
        eventsBeneficiaryProduct.DeliveredDate = obj.DeliveredDate;
        eventsBeneficiaryProduct.DeliveredQuantity = obj.DeliveredQuantity;
        if (obj.EventsBeneficiary != null)
        {
            eventsBeneficiaryProduct.eventosBeneficiario = EventsBeneficiary.convertDTOToModel(obj.EventsBeneficiary) ;
        }
        if (obj.Product != null)
        {
            eventsBeneficiaryProduct.produto = Product.convertDTOToModel(obj.Product);
        }
        eventsBeneficiaryProduct.deliveredBeneficiary = Beneficiary.convertDTOToModel(obj.DeliveredBeneficiary);
        return eventsBeneficiaryProduct;
    }


        public  static void save(RegisterEventBeneficiaryProductDTO eventsBeneficiaryProduct)
    {
       using(var context = new Context()){
            var dados = new EventsBeneficiaryProduct()
            {
                quantity = eventsBeneficiaryProduct.quantity,
                deliveredDate = eventsBeneficiaryProduct.deliveredDate,
                deliveredQuantity = eventsBeneficiaryProduct.deliveredQuantity,
                eventosBeneficiario = context.eventsBeneficiary.Where(c => c.Beneficiario.Edv == eventsBeneficiaryProduct.edv && c.Evento.Id == eventsBeneficiaryProduct.eventId).Single(),
                
                produto = context.product.Where(c => c.Id == eventsBeneficiaryProduct.productId).Single(),
                deliveredBeneficiary = context.beneficiary.Where(c => c.Edv == eventsBeneficiaryProduct.edv).Single()

            };
            context.eventsBeneficiaryProduct.Add(dados);
            context.SaveChanges();
       }
    }

    public static int getEventId(EventsBeneficiary events)
    {
        Console.WriteLine("entrou evento");
        int id;
        using (var context = new Context())
        {
            var evento = context.eventsBeneficiary.FirstOrDefault(i => i.Evento.Name == events.Evento.Name);
            id = evento.Id;
        }
        Console.WriteLine("saiu evento");
        return id;
    }

    public static int getProductId(Product products)
    {
        Console.WriteLine("entrou product");
        int id;
        using (var context = new Context())
        {
            var evento = context.product.FirstOrDefault(i => i.Name == products.Name);
            id = evento.Id;
        }
        Console.WriteLine("saiu product");
        return id;
    }

    public static int getBeneficiaryId(Beneficiary beneficiarys)
    {
        Console.WriteLine("entrou beneficiario");
        int id;
        using (var context = new Context())
        {
            var evento = context.beneficiary.FirstOrDefault(i => i.Edv == beneficiarys.Edv);
            id = evento.Id;
        }
        Console.WriteLine("saiu beneficiario");
        return id;
    }

    public void update(EventsBeneficiaryProductDTO productDTO, int id)
    {
        using (var context = new Context())
        {
            var product = context.eventsBeneficiaryProduct.FirstOrDefault(s => s.Id == id);
            if (product != null)
            {
                if (productDTO.Quantity != null)
                {
                    product.Quantity = productDTO.Quantity;
                }
                if (productDTO.DeliveredDate != null)
                {
                    product.DeliveredDate = productDTO.DeliveredDate;
                }
                if(productDTO.DeliveredQuantity != null)
                {
                    product.DeliveredQuantity = productDTO.DeliveredQuantity;
                }
                //if(productDTO.DeliveredBeneficiary != null)
                //{
                //    product.DeliveredBeneficiary
                //} TEM QUE IMPLEMENTAR O BENEFICIARIO QUE TIROU PRA TROCAR O ID NO BANCO
            }
            context.SaveChanges();
        }
    }

    public static void delete(int idProduct, int idEventBeneficiary)
    {
     
        using (var context = new Context())
        {
            var eventsBeneProd = context.eventsBeneficiaryProduct.Where(i => i.Produto.Id == idProduct && i.EventosBeneficiario.Id == idEventBeneficiary);

            foreach (var item in eventsBeneProd)
            {
                context.eventsBeneficiaryProduct.Remove(item);
            }

            context.SaveChanges();
        }
    }

    public static List<object> findID(int idEvent, int idBeneficiary)
    {
        using (var context = new Context())
        {
             var eventbeneficiaryProduct = context.eventsBeneficiaryProduct.Where(d => d.EventosBeneficiario.Evento.Id == idEvent && d.EventosBeneficiario.Beneficiario.Id == idBeneficiary).Include(d => d.Produto).Include(d => d.EventosBeneficiario.Evento);
            
            List<object> eventosbeneficiarysproducts = new List<object>();

            foreach (var item in eventbeneficiaryProduct)
            {
                Console.WriteLine(item);
                eventosbeneficiarysproducts.Add(item);
            }

            return eventosbeneficiarysproducts;
        }
    }

    public static List<object> GetAllGraph(int evento)
    {
        using (var context = new Context())
        {
            var eventsBeneficiaryProduct = context.eventsBeneficiaryProduct.Join(context.stock, ebp => ebp.Produto, p => p.Product, (ebp, p) => new
            {
                id = ebp.Id,
                quantity = ebp.Quantity,
                deliveredQuantity = ebp.DeliveredQuantity,
                stockTotal = p.Total,
                stockRestante = p.CurrentStock,
                evento = ebp.Produto.Eventos,
                produto = ebp.Produto
            }).Where(e => e.evento.Id == evento);

            List<object> grafico = new List<object>();

            foreach(var item in eventsBeneficiaryProduct)
            {
                grafico.Add(item);
            }

            return grafico;
        }
    }

    public static List<object> findCPF(string cpf, string ip)
    {
        using (var context = new Context())
        {
            var eventbeneficiaryProduct = context.eventsBeneficiaryProduct.Join(context.beneficiary, ebp => ebp.EventosBeneficiario.BeneficiarioNomeado, b => b.Id, (ebp, b) => new {
                   id = ebp.Id,
                   quantity = ebp.quantity,
                   unitCost = ebp.Produto.UnitCost,
                   deliveredDate = ebp.DeliveredDate,
                   deliveredQuantity = ebp.DeliveredQuantity,
                   deliveredBeneficiary = ebp.DeliveredBeneficiary,
                   eventosBeneficiario = ebp.EventosBeneficiario,
                   nomeBeneficiario = ebp.EventosBeneficiario.Beneficiario.Name,
                   nomeTerceiro = b.Name,
                   cpfTerceiro = b.Cpf,
                   produto = ebp.Produto,
                   evento = ebp.Produto.Eventos
            }).Join(context.stationProduct, ebp => ebp.produto, sp => sp.Produtos, (ebp, sp) => new
                {
                    id = ebp.id,
                    quantity = ebp.quantity,
                    unitCost = ebp.unitCost,
                    deliveredDate = ebp.deliveredDate,
                    deliveredQuantity = ebp.deliveredQuantity,
                    deliveredBeneficiary = ebp.deliveredBeneficiary,
                    eventosBeneficiario = ebp.eventosBeneficiario,
                    nomeBeneficiario = ebp.nomeBeneficiario,
                    nomeTerceiro = ebp.nomeTerceiro,
                    cpfTerceiro = ebp.cpfTerceiro,
                    produto = ebp.produto,
                    station = sp.Station,
                    evento = ebp.evento
                }).Join(context.stock, ebp=> ebp.produto, st => st.Product, (ebp, st) => new
                {
                    id = ebp.id,
                    quantity = ebp.quantity,
                    unitCost = ebp.unitCost,
                    deliveredDate = ebp.deliveredDate,
                    deliveredQuantity = ebp.deliveredQuantity,
                    deliveredBeneficiary = ebp.deliveredBeneficiary,
                    eventosBeneficiario = ebp.eventosBeneficiario,
                    nomeBeneficiario = ebp.nomeBeneficiario,
                    nomeTerceiro = ebp.nomeTerceiro,
                    cpfTerceiro = ebp.cpfTerceiro,
                    isActiveBeneficiario = ebp.eventosBeneficiario.Beneficiario.IsActive,
                    produto = ebp.produto,
                    station = ebp.station,
                    evento = ebp.evento,
                    stock = st.Total
                }).Where(s => s.station.IpAddress == ip && s.cpfTerceiro == cpf && s.station.IsActive == true && s.evento.IsActive == true && s.isActiveBeneficiario == true); //FALTA IMPLEMENTAR DAI AQUI UM WHERE DA ESTAÇÃO TEM QUE PASSAR TAMBEM O PARAMETRO

            List<object> eventosbeneficiarysproducts = new List<object>();

            foreach (var item in eventbeneficiaryProduct)
            {
                eventosbeneficiarysproducts.Add(item);
            }

            return eventosbeneficiarysproducts;
        }
    }

    public static List<object> findEDV(string edv, string ip)
    {
        using (var context = new Context())
        {
            var eventbeneficiaryProduct = context.eventsBeneficiaryProduct.Join(context.beneficiary, ebp => ebp.EventosBeneficiario.BeneficiarioNomeado, b => b.Id, (ebp, b) => new {
                id = ebp.Id,
                quantity = ebp.quantity,
                unitCost = ebp.Produto.UnitCost,
                deliveredDate = ebp.DeliveredDate,
                deliveredQuantity = ebp.DeliveredQuantity,
                deliveredBeneficiary = ebp.DeliveredBeneficiary,
                eventosBeneficiario = ebp.EventosBeneficiario,
                edvBeneficiario = ebp.EventosBeneficiario.Beneficiario.Edv,
                nomeBeneficiario = ebp.EventosBeneficiario.Beneficiario.Name,
                nomeTerceiro = b.Name,
                edvTerceiro = b.Edv,
                produto = ebp.Produto,
                evento = ebp.Produto.Eventos
            }).Join(context.stationProduct, ebp => ebp.produto, sp => sp.Produtos, (ebp, sp) => new
            {
                id = ebp.id,
                quantity = ebp.quantity,
                unitCost = ebp.unitCost,
                deliveredDate = ebp.deliveredDate,
                deliveredQuantity = ebp.deliveredQuantity,
                deliveredBeneficiary = ebp.deliveredBeneficiary,
                eventosBeneficiario = ebp.eventosBeneficiario,
                edvBeneficiario = ebp.edvBeneficiario,
                nomeBeneficiario = ebp.nomeBeneficiario,
                nomeTerceiro = ebp.nomeTerceiro,
                edvTerceiro = ebp.edvTerceiro,
                produto = ebp.produto,
                station = sp.Station,
                evento = ebp.evento
            }).Join(context.stock, ebp => ebp.produto, st => st.Product, (ebp, st) => new
            {
                id = ebp.id,
                quantity = ebp.quantity,
                unitCost = ebp.unitCost,
                deliveredDate = ebp.deliveredDate,
                deliveredQuantity = ebp.deliveredQuantity,
                deliveredBeneficiary = ebp.deliveredBeneficiary,
                eventosBeneficiario = ebp.eventosBeneficiario,
                edvBeneficiario = ebp.edvBeneficiario,
                nomeBeneficiario = ebp.nomeBeneficiario,
                nomeTerceiro = ebp.nomeTerceiro,
                edvTerceiro = ebp.edvTerceiro,
                isActiveBeneficiario = ebp.eventosBeneficiario.Beneficiario.IsActive,
                produto = ebp.produto,
                station = ebp.station,
                evento = ebp.evento,
                stock = st.Total
            }).Where(s => s.station.IpAddress == ip && s.edvTerceiro == edv && s.station.IsActive == true && s.evento.IsActive == true && s.isActiveBeneficiario == true); //FALTA IMPLEMENTAR DAI AQUI UM WHERE DA ESTAÇÃO TEM QUE PASSAR TAMBEM O PARAMETRO

            var eventbeneficiaryProduct2 = context.eventsBeneficiaryProduct.Join(context.beneficiary, ebp => ebp.EventosBeneficiario.Beneficiario.Id, b => b.Id, (ebp, b) => new {
                id = ebp.Id,
                quantity = ebp.quantity,
                unitCost = ebp.Produto.UnitCost,
                deliveredDate = ebp.DeliveredDate,
                deliveredQuantity = ebp.DeliveredQuantity,
                deliveredBeneficiary = ebp.DeliveredBeneficiary,
                eventosBeneficiario = ebp.EventosBeneficiario,
                edvBeneficiario = ebp.EventosBeneficiario.Beneficiario.Edv,
                nomeBeneficiario = ebp.EventosBeneficiario.Beneficiario.Name,
                nomeTerceiro = b.Name,
                edvTerceiro = b.Edv,
                produto = ebp.Produto,
                evento = ebp.Produto.Eventos
            }).Join(context.stationProduct, ebp => ebp.produto, sp => sp.Produtos, (ebp, sp) => new
            {
                id = ebp.id,
                quantity = ebp.quantity,
                unitCost = ebp.unitCost,
                deliveredDate = ebp.deliveredDate,
                deliveredQuantity = ebp.deliveredQuantity,
                deliveredBeneficiary = ebp.deliveredBeneficiary,
                eventosBeneficiario = ebp.eventosBeneficiario,
                edvBeneficiario = ebp.edvBeneficiario,
                nomeBeneficiario = ebp.nomeBeneficiario,
                nomeTerceiro = ebp.nomeTerceiro,
                edvTerceiro = ebp.edvTerceiro,
                produto = ebp.produto,
                station = sp.Station,
                evento = ebp.evento
            }).Join(context.stock, ebp => ebp.produto, st => st.Product, (ebp, st) => new
            {
                id = ebp.id,
                quantity = ebp.quantity,
                unitCost = ebp.unitCost,
                deliveredDate = ebp.deliveredDate,
                deliveredQuantity = ebp.deliveredQuantity,
                deliveredBeneficiary = ebp.deliveredBeneficiary,
                eventosBeneficiario = ebp.eventosBeneficiario,
                edvBeneficiario = ebp.edvBeneficiario,
                nomeBeneficiario = ebp.nomeBeneficiario,
                nomeTerceiro = ebp.nomeTerceiro,
                edvTerceiro = ebp.edvTerceiro,
                isActiveBeneficiario = ebp.eventosBeneficiario.Beneficiario.IsActive,
                produto = ebp.produto,
                station = ebp.station,
                evento = ebp.evento,
                stock = st.Total
            }).Where(s => s.station.IpAddress == ip && s.edvTerceiro == edv && s.station.IsActive == true && s.evento.IsActive == true && s.isActiveBeneficiario == true);


            List<object> eventosbeneficiarysproducts = new List<object>();

            foreach (var item in eventbeneficiaryProduct)
            {
                eventosbeneficiarysproducts.Add(item);
            }

            foreach (var item in eventbeneficiaryProduct2)
            {
                eventosbeneficiarysproducts.Add(item);
            }

            return eventosbeneficiarysproducts;
        }
    }
    public static List<object> findEDVBeneficiario(string edv, string ip)
    {

        using (var context = new Context())
        {
            var eventbeneficiaryProduct = context.eventsBeneficiaryProduct.Join(context.stationProduct, ebp => ebp.Produto, sp => sp.Produtos, (ebp, sp) => new
            {
                id = ebp.Id,
                quantity = ebp.Quantity,
                unitCost = ebp.Produto.UnitCost,
                deliveredDate = ebp.DeliveredDate,
                deliveredQuantity = ebp.DeliveredQuantity,
                deliveredBeneficiary = ebp.DeliveredBeneficiary,
                eventosBeneficiario = ebp.EventosBeneficiario,
                produto = ebp.Produto,
                station = sp.Station,
                evento = ebp.Produto.Eventos
            }).Join(context.eventsBeneficiary, ebp => ebp.eventosBeneficiario.Id, eb => eb.Id, (ebp, eb) => new
            {
                id = ebp.id,
                quantity = ebp.quantity,
                unitCost = ebp.unitCost,
                deliveredDate = ebp.deliveredDate,
                deliveredQuantity = ebp.deliveredQuantity,
                deliveredBeneficiary = ebp.deliveredBeneficiary,
                eventosBeneficiario = ebp.eventosBeneficiario,
                produto = ebp.produto,
                station = ebp.station,
                evento = ebp.evento,
                edvBeneficiario = eb.Beneficiario.Edv,
                nomeBeneficiario = eb.Beneficiario.Name
            }).Join(context.stock, ebp => ebp.produto, st => st.Product, (ebp,st) => new
            {
                id = ebp.id,
                quantity = ebp.quantity,
                unitCost = ebp.unitCost,
                deliveredDate = ebp.deliveredDate,
                deliveredQuantity = ebp.deliveredQuantity,
                deliveredBeneficiary = ebp.deliveredBeneficiary,
                eventosBeneficiario = ebp.eventosBeneficiario,
                produto = ebp.produto,
                station = ebp.station,
                evento = ebp.evento,
                isActiveBeneficiary = ebp.eventosBeneficiario.Beneficiario.IsActive,
                edvBeneficiario = ebp.edvBeneficiario,
                nomeBeneficiario = ebp.nomeBeneficiario,
                stock = st.Total
            }).Where(s => s.station.IpAddress == ip && s.edvBeneficiario == edv && s.station.IsActive == true && s.evento.IsActive == true && s.isActiveBeneficiary == true); //FALTA IMPLEMENTAR DAI AQUI UM WHERE DA ESTAÇÃO TEM QUE PASSAR TAMBEM O PARAMETRO

            List<object> eventosbeneficiarysproducts = new List<object>();

            foreach (var item in eventbeneficiaryProduct)
            {
                eventosbeneficiarysproducts.Add(item);
            }

            return eventosbeneficiarysproducts;
        }
    }



    public static List<object> findProducts(int idBeneficiary)
    {
        using (var context = new Context())
        {
            var eventbeneficiaryProduct = context.eventsBeneficiaryProduct.Where(d => d.EventosBeneficiario.Beneficiario.Id == idBeneficiary).Include(d => d.EventosBeneficiario.Evento).Include(d=>d.Produto);

            List<object> eventosbeneficiarysproducts = new List<object>();

            foreach (var item in eventbeneficiaryProduct)
            {
                // Console.WriteLine(item);
                eventosbeneficiarysproducts.Add(item);
            }

            return eventosbeneficiarysproducts;
        }
    }

    public static List<object> findProductsBeneficiary(int idBeneficiary)
    {
        using (var context = new Context())
        {
            var eventbeneficiaryProduct = context.eventsBeneficiaryProduct.Where(d => d.EventosBeneficiario.Beneficiario.Id == idBeneficiary && d.Quantity>0).Include(d => d.EventosBeneficiario.Evento).Include(d=>d.Produto);

            List<object> eventosbeneficiarysproducts = new List<object>();

            foreach (var item in eventbeneficiaryProduct)
            {
                Console.WriteLine(item);
                eventosbeneficiarysproducts.Add(item);
            }

            return eventosbeneficiarysproducts;
        }
    }
    public EventsBeneficiaryProductDTO findById(int id)
    {
        return new EventsBeneficiaryProductDTO();
    }

    public List<EventsBeneficiaryProductDTO> getAll() { return new List<EventsBeneficiaryProductDTO>(); }
}
