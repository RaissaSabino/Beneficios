using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class EventsBeneficiaryDTO
    {
        private EventsDTO evento;
        private BeneficiaryDTO beneficiary;
        private int beneficiaryNominees;

        public EventsDTO Evento { get => evento; set => evento = value; }
        public BeneficiaryDTO Beneficiary { get => beneficiary; set => beneficiary = value; }
        public int BeneficiaryNominees { get => beneficiaryNominees; set => beneficiaryNominees = value; }
    }
}
