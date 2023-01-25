//teste de edi��o 


using DTO;
using System;
using System.Net;
using System.Net.Sockets;

namespace Model;
public class Station : IValidateDataObject, IDataController<StationDTO, Station>
{
    private int id;
    private string ipAddress;
    private string description;
    private bool isActive;

    public int Id { get => id; set => id = value; }
    public string IpAddress { get => ipAddress; set => ipAddress = value; }
    public string Description { get => description; set => description = value; }
    public bool IsActive { get => isActive; set => isActive = value; }

    public bool validateObject()
    {
        if (this.IpAddress == null)
        {
            return false;
        }
        if (this.description == null)
        {
            return false;
        }
        return true;
    }

    public StationDTO convertModelToDTO()
    {
        var stationDTO = new StationDTO();
        stationDTO.ipAddress = this.IpAddress;
        stationDTO.description = this.Description;
        stationDTO.isActive = this.IsActive;
        return stationDTO;
    }

    public static Station convertDTOToModel(StationDTO obj)
    {
        Station station = new Station();
        station.IpAddress = obj.ipAddress;
        station.Description = obj.description;
        station.IsActive = obj.isActive;
        return station;
    }

    public static int save(StationDTO station)
    {
        var estacao = Station.convertDTOToModel(station);
        using (var context = new Context()) { 
            
            context.station.Add(estacao);
            context.SaveChanges();            
        }
        return estacao.id;
    }

    public static string getIp()
    {
        string localIP = string.Empty;
        using (Socket socket = new Socket(AddressFamily.InterNetwork, SocketType.Dgram, 0))
        {
            socket.Connect("8.8.8.8", 65530);
            IPEndPoint endPoint = socket.LocalEndPoint as IPEndPoint;
            localIP = endPoint.Address.ToString();

        }

        return localIP;
    }

    public static void update(StationDTO stationDTO)
    {
        using (var context = new Context())
        {
            var station = context.station.FirstOrDefault(a => a.Id == stationDTO.id);
            station.ipAddress = stationDTO.ipAddress;
            station.description = stationDTO.description;
            station.isActive = stationDTO.isActive;
            
            context.SaveChanges();
        }
    }

    public static List<object> findAll()
    {
        using (var context = new Context())
        {
            var station = context.station;

            List<object> stations = new List<object>();

            foreach (var item in station)
            {
                stations.Add(item);
            }

            return stations;
        }
    }

    public static IEnumerable<object> PesquisaStation(PesquisaStation pesquisa)
    {
        using (var context = new Context())
        {
            var estacao = context.station.ToList();
            if (pesquisa.ipAddress != "") estacao = estacao.Where(e => e.ipAddress.Contains(pesquisa.ipAddress)).ToList();
            if (pesquisa.isActive != "")
            {
                if (pesquisa.isActive == "true") estacao = estacao.Where(e => e.isActive == true).ToList();
                else estacao = estacao.Where(e => e.isActive == false).ToList();
            }
            if (pesquisa.description != "") estacao = estacao.Where(e => e.description.ToLower().Contains(pesquisa.description.ToLower())).ToList();


            return estacao;
        }
    }



    public static object findID(int id)
    {
        using (var context = new Context())
        {
            var station = context.station.FirstOrDefault(d => d.Id == id);
            return new
            {
                ipAddress = station.IpAddress,
                Description = station.Description,
                IsActive = station.IsActive
            };
        }
    }

    public static int FindStationID(string ipAddress)
    {
        using (var context = new Context())
        {
            var station = context.station.FirstOrDefault(s => s.IpAddress == ipAddress);
            return station.id;
        }
    }

    public StationDTO findById(int id)
    {
        return new StationDTO();
    }

    public List<StationDTO> getAll() { return new List<StationDTO>(); }
    public static void delete(Station station)
    {
        using (var context = new Context())
        {
            var stations = context.station.FirstOrDefault(i => i.IpAddress == station.ipAddress);

            context.station.Remove(stations);
            context.SaveChanges();
        }
    }
}