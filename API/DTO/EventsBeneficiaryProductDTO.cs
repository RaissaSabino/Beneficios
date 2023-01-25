using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class EventsBeneficiaryProductDTO
    {
        private int quantity;
        private int deliveredQuantity;
        private DateTime deliveredDate;
        private EventsBeneficiaryDTO eventsBeneficiary;
        private ProductDTO product;
        private BeneficiaryDTO deliveredBeneficiary;

        public int Quantity { get => quantity; set => quantity = value; }
        public int DeliveredQuantity { get => deliveredQuantity; set => deliveredQuantity = value; }
        public DateTime DeliveredDate { get => deliveredDate; set => deliveredDate = value; }
        public EventsBeneficiaryDTO EventsBeneficiary { get => eventsBeneficiary; set => eventsBeneficiary = value; }
        public ProductDTO Product { get => product; set => product = value; }
        public BeneficiaryDTO DeliveredBeneficiary { get => deliveredBeneficiary; set => deliveredBeneficiary = value; }
    }
}
