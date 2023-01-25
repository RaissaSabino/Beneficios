using DTO;
using Microsoft.EntityFrameworkCore;
namespace Model;
public class EventsBeneficiary : IValidateDataObject, IDataController<EventsBeneficiaryDTO, EventsBeneficiary>
{
    private int id;
    private Events evento;
    private Beneficiary beneficiario;
    private int beneficiarioNomeado;

    //public void addBeneficiaryToEvents(Beneficiary beneficiary)
    //{
    //    beneficiarys.Add(beneficiary);
    //}
    //public void addBeneficiaryNomineesToEvents(Beneficiary beneficiaryNominees)
    //{
    //    beneficiarys.Add(beneficiaryNominees);
    //}
    //teste de edição 
    public int Id { get => id; set => id = value; }
    public Events Evento { get => evento; set => evento = value; }
    public Beneficiary Beneficiario { get => beneficiario; set => beneficiario = value; }
    public int BeneficiarioNomeado { get => beneficiarioNomeado; set => beneficiarioNomeado = value; }
    

    public bool validateObject()
    {
        if (this.evento == null)
        {
            return false;
        }
        return true;
    }

    public EventsBeneficiaryDTO convertModelToDTO()
    {
        var eventsBeneficiaryDTO = new EventsBeneficiaryDTO();
        eventsBeneficiaryDTO.Evento = this.Evento.convertModelToDTO();
        eventsBeneficiaryDTO.Beneficiary = this.Beneficiario.convertModelToDTO();
        eventsBeneficiaryDTO.BeneficiaryNominees = this.BeneficiarioNomeado;
        return eventsBeneficiaryDTO;
    }

    public static EventsBeneficiary convertDTOToModel(EventsBeneficiaryDTO obj)
    {
        var eventsBeneficiary = new EventsBeneficiary();

        eventsBeneficiary.BeneficiarioNomeado = obj.BeneficiaryNominees;

        if (obj.Evento != null)
        {
            eventsBeneficiary.Evento = Events.convertDTOToModel(obj.Evento);
        }
        if (obj.Beneficiary != null)
        {
            eventsBeneficiary.beneficiario = Beneficiary.convertDTOToModel(obj.Beneficiary);
        }
        return eventsBeneficiary;
    }

    public EventsBeneficiaryDTO findById(int id)
    {
        return new EventsBeneficiaryDTO();
    }

    public static List<object> findAll()
    {
        using (var context = new Context())
        {
            var bene = context.eventsBeneficiary.Include(b => b.Beneficiario);

            List<object> beneficiarys = new List<object>();

            foreach (var item in bene)
            {
                beneficiarys.Add(item);
            }

            return beneficiarys;
        }
    }
    public static List<object> findCPF(string cpf)
    {
        using (var context = new Context())
        {
            var beneficiarys = context.eventsBeneficiary.Join(context.beneficiary, eb => eb.BeneficiarioNomeado, b => b.Id, (eb , b) => new
            {
                id = eb.Id,
                beneficiario = eb.Beneficiario,
                beneficiarioNomeadoId = eb.BeneficiarioNomeado,
                beneficiarioNomeadoNome = b.Name,
                beneficiarioNomeadoEdv = b.Edv,
                beneficiarioNomeadoCpf = b.Cpf,
                beneficiarioNomeadoInclusionDate = b.InclusionDate,
                beneficiarioNomeadoUser = b.User,
                beneficiarioNomeadoThirdParty = b.ThirdParty,
                beneficiarioNomeadoArea = b.Area,
                beneficiarioNomeadoBirthDate = b.BirthDate
            }).Where(b => b.beneficiarioNomeadoCpf == cpf);

            List<object> eventsBeneficiarys = new List<object>();

            foreach(var item in beneficiarys)
            {
                eventsBeneficiarys.Add(item);
            }

            return eventsBeneficiarys;
           
        }
    }

    public static List<object> findEDV(string edv)
    {
        using (var context = new Context())
        {
            var beneficiarys = context.eventsBeneficiary.Join(context.beneficiary, eb => eb.BeneficiarioNomeado, b => b.Id, (eb, b) => new
            {
                id = eb.Id,
                beneficiario = eb.Beneficiario,
                beneficiarioNomeadoId = eb.BeneficiarioNomeado,
                beneficiarioNomeadoNome = b.Name,
                beneficiarioNomeadoEdv = b.Edv,
                beneficiarioNomeadoCpf = b.Cpf,
                beneficiarioNomeadoInclusionDate = b.InclusionDate,
                beneficiarioNomeadoUser = b.User,
                beneficiarioNomeadoThirdParty = b.ThirdParty,
                beneficiarioNomeadoArea = b.Area,
                beneficiarioNomeadoBirthDate = b.BirthDate
            }).Where(b => b.beneficiarioNomeadoEdv == edv);

            List<object> eventsBeneficiarys = new List<object>();

            foreach (var item in beneficiarys)
            {
                eventsBeneficiarys.Add(item);
            }

            return eventsBeneficiarys;

        }
    }


    public static IEnumerable<object> findCPFBeneficiario(string edv)
    {
        using (var context = new Context())
        {
            var beneficiarys = context.eventsBeneficiary
                .Join(context.beneficiary, eb => eb.Beneficiario.Id, b => b.Id, (eb, b) => new
                {
                    id = eb.Id,
                    beneficiario = eb.Beneficiario,
                    nomeado = eb.BeneficiarioNomeado,
                    edvBeneficiario = eb.Beneficiario.Edv,
                    edvIndicado = b.Edv,
                    third = b.ThirdParty
                }).Where(d => d.edvBeneficiario == edv).ToList();

            var indicado = context.eventsBeneficiary
                .Join(context.beneficiary, eb => eb.BeneficiarioNomeado, b => b.Id, (eb, b) => new
                {
                    id = eb.Id,
                    beneficiario = eb.Beneficiario,
                    nomeado = eb.BeneficiarioNomeado,
                    edvBeneficiario = eb.Beneficiario.Edv,
                    edvIndicado = b.Edv,
                    third = b.ThirdParty
                }).Where(d => d.edvIndicado == edv).ToList();

            List<object> eventsBeneficiarys = new List<object>();



            foreach(var item in beneficiarys)
            {
                eventsBeneficiarys.Add(item);
            }

            foreach (var item in indicado)
            {
                eventsBeneficiarys.Add(item);
            }

            return eventsBeneficiarys;
        }
    }

    public static int updateColaborador(int id,int evento, int iduser)
    {
        using (var context = new Context())
        {
            var eventsBeneficiaryy = context.eventsBeneficiary.Include(e=>e.Evento).Include(e => e.Beneficiario)
                .FirstOrDefault(e=> e.Evento.Id==evento && e.Beneficiario.Id==iduser);
            if(eventsBeneficiaryy != null)
            {
                Console.WriteLine($"Entrou {id}");
                eventsBeneficiaryy.BeneficiarioNomeado = id;
            }
            context.SaveChanges();
        }
        return id;
    }

    public List<EventsBeneficiaryDTO> getAll() { return new List<EventsBeneficiaryDTO>(); }

    public static int save(int events, int beneficiarys)
    {
            int id = 0;
            using (var context = new Context())
            {
                var eventsBeneficiaryModel = new EventsBeneficiary
                {
                    Evento = context.events.FirstOrDefault(c => c.Id == events),
                    Beneficiario = context.beneficiary.FirstOrDefault(s => s.Id == beneficiarys)
                };

            context.eventsBeneficiary.Add(eventsBeneficiaryModel);

                if (eventsBeneficiaryModel.evento != null)
                {
                    context.Entry(eventsBeneficiaryModel.Evento).State = Microsoft.EntityFrameworkCore.EntityState.Unchanged;
                }
                if (eventsBeneficiaryModel.beneficiario != null)
                {
                    context.Entry(eventsBeneficiaryModel.Beneficiario).State = Microsoft.EntityFrameworkCore.EntityState.Unchanged;
                }
                context.SaveChanges();

    id = eventsBeneficiaryModel.Id;
            }
            return id;
    }

    public static List<object> findID(int id)
    {
        using (var context = new Context())
        {
            Console.WriteLine("passou 1");
            var eventbeneficiaryy = context.eventsBeneficiary.Where(d => d.Evento.Id == id).Include(d => d.Evento).Include(d => d.Beneficiario);
            Console.WriteLine("passou 2");
            List<object> eventosbeneficiarys = new List<object>();

            foreach(var produto in eventbeneficiaryy)
            {
                Console.WriteLine(produto);
                eventosbeneficiarys.Add(produto);
            }

            return eventosbeneficiarys;
        }
    }

    public static List<object> findId(int id)
    {
        using (var context = new Context())
        {
            var eventbeneficiaryy = context.eventsBeneficiary.Where(d => d.Beneficiario.Id == id).Include(d => d.Evento).Include(d => d.Beneficiario);
            List<object> eventosbeneficiarys = new List<object>();

            foreach (var produto in eventbeneficiaryy)
            {
                Console.WriteLine(produto);
                eventosbeneficiarys.Add(produto);
            }

            return eventosbeneficiarys;
        }
    }


      public static IEnumerable<object> PesquisaBeneficiary(PesquisaBeneficiary pesquisa)
    {
        using (var context = new Context())
        {

            var beneficiary = context.eventsBeneficiary.Include(b=>b.Beneficiario).Include(a => a.Evento).Where(q=>q.Evento.Id == int.Parse(pesquisa.eventId)).Where(b=>b.Beneficiario.IsActive == true).ToList();


           if (pesquisa.edv != "") beneficiary = beneficiary.Where(b=>b.Beneficiario.Edv.Contains(pesquisa.edv)).ToList();
            
            if (pesquisa.name != "") beneficiary = beneficiary.Where(e => e.Beneficiario.Name.ToLower().Contains(pesquisa.name.ToLower())).ToList();
             return beneficiary;
        }
    }

    public static void delete(int idEvent, string edvBeneficiary)
    {

        using (var context = new Context())
        {
            var eventsBeneficiary = context.eventsBeneficiary.Where(i => i.Evento.Id == idEvent && i.Beneficiario.Edv == edvBeneficiary);
            var eventsBeneficiaryProduct = context.eventsBeneficiaryProduct.Where(i => i.EventosBeneficiario.Evento.Id == idEvent && i.EventosBeneficiario.Beneficiario.Edv == edvBeneficiary);

            foreach (var item in eventsBeneficiary)
            {
                context.eventsBeneficiary.Remove(item);
            }

            foreach(var item in eventsBeneficiaryProduct)
            {
                context.eventsBeneficiaryProduct.Remove(item);
            }

            context.SaveChanges();
        }
    }


}
