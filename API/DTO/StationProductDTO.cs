using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class StationProductDTO
    {
        //private int id;
        private StationDTO station;
        private ProductDTO product;

        //public int Id { get { return id; } set { id = value; } }
        public StationDTO Station { get => station; set => station = value; }
        public ProductDTO Product { get => product; set => product = value; }
    }
}
