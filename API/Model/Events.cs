using DTO;

namespace Model;
public class Events : IValidateDataObject, IDataController<EventsDTO, Events>
{
	private int id;
	private string name;
    private string description;
    private DateTime startDate;
    private DateTime endDate;
    private bool isActive;

    public int Id { get => id; set => id = value; }
    public string Name { get => name; set => name = value; }
    public string Description { get => description; set => description = value; }
    public DateTime StartDate { get => startDate; set => startDate = value; }
    public DateTime EndDate { get => endDate; set => endDate = value; }
    public bool IsActive { get => isActive; set => isActive = value; }    

    public bool validateObject()
    {
        if (this.name == null)
        {
            return false;
        }
        if (this.description == null)
        {
            return false;
        }
        if (this.startDate == null)
        {
            return false;
        }
        if (this.endDate == null)
        {
            return false;
        }
        if (this.isActive == null)
        {
            return false;
        }            
        return true;
    }

    public EventsDTO convertModelToDTO()
    {
        var eventsDTO = new EventsDTO();
        eventsDTO.name = this.Name;
        eventsDTO.description = this.Description;
        eventsDTO.startDate = this.StartDate;
        eventsDTO.endDate = this.EndDate;
        eventsDTO.isActive = this.IsActive;                      
        return eventsDTO;
    }

    public static Events convertDTOToModel(EventsDTO obj)
    {
        Events events = new Events();
        events.Name = obj.name;
        events.Description = obj.description;
        events.StartDate = obj.startDate;
        events.EndDate = obj.endDate;
        events.IsActive = obj.isActive;        
        return events;
    }

    public int save()
    {
        int id = 0;
        using (var context = new Context())
        {
            var evento = new Events()
            {
                name = this.name,
                description = this.description,
                startDate = this.startDate,
                endDate = this.endDate,
                isActive = this.isActive
            };
            context.events.Add(evento);
            context.SaveChanges();
            id = evento.id;
        }
        return id;
    }

    public static void update(EventsDTO eventsDTO, int id)
    {
        using (var context = new Context())
        {            
            var events = context.events.Where(a => a.Id == id).First();
            if (events != null)
            {
                if (String.IsNullOrEmpty(eventsDTO.name) == false)
                {
                    events.name = eventsDTO.name;
                }
                if (String.IsNullOrEmpty(eventsDTO.description) == false)
                {
                    events.description = eventsDTO.description;
                }
                if (eventsDTO.startDate != null)
                {
                    events.startDate = eventsDTO.startDate;
                }
                if (eventsDTO.endDate != null)
                {
                    events.endDate = eventsDTO.endDate;
                }
                if (eventsDTO.isActive != null)
                {
                    events.isActive = eventsDTO.isActive;
                }
            }
            context.SaveChanges();
        }
    }
    public static void delete(int id)
    {
        using (var context = new Context())
        {
            var events = context.events.Where(i => i.Id == id).First();
      
            context.events.Remove(events);
            context.SaveChanges();
        }
    }

    public static List<object> findAll()
    {
        using (var context = new Context())
        {
            var evento = context.events;

            List<object> eventos = new List<object>();

            foreach (var item in evento)
            {
                eventos.Add(item);
            }

            return eventos;
        }
    }

     public static IEnumerable<object> GetTablePesquisa(PesquisaEvents pesquisa)
    {
        using (var context = new Context())
        {
            var eventos = context.events.ToList();
            if(pesquisa.name != "") eventos = eventos.Where(e=>e.Name.ToLower().Contains(pesquisa.name.ToLower())).ToList();
            if(pesquisa.isActive !="") {
                if(pesquisa.isActive == "true") eventos = eventos.Where(e=>e.isActive==true).ToList();
                else eventos = eventos.Where(e=>e.isActive==false).ToList();
            }
            

           
            return eventos;
        }
    }
    public static object findID(int id)
    {
        using (var context = new Context())
        {
            var events = context.events.FirstOrDefault(d => d.Id == id);
            return new
            {
                Name = events.Name,
                Description = events.Description,
                StartDate = events.StartDate,
                EndDate = events.EndDate,
                IsActive = events.IsActive
            };
        }
    }

    public EventsDTO findById(int id)
    {
        return new EventsDTO();
    }

    public List<EventsDTO> getAll() { return new List<EventsDTO>(); }
}