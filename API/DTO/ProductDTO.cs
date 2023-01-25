using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ProductDTO
    {
        private string name;
        private decimal unitCost;
        private EventsDTO events;

        public string Name { get => name; set => name = value; }
        public decimal UnitCost { get => unitCost; set => unitCost = value; }
        public EventsDTO Events { get => events; set => events = value; }
    }
}
