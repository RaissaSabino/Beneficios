using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class BeneficiaryDTO
    {
        private string name;
        private string edv;
        private string cpf;
        private DateTime inclusionDate;
        private string user;
        private bool thirdParty;
        private string area;
        private DateTime birthDate;
        private bool adm;
        private bool isActive;
        
        public string Name { get => name; set => name = value; }
        public string Edv { get => edv; set => edv = value; }
        public string Cpf { get => cpf; set => cpf = value; }
        public DateTime InclusionDate { get => inclusionDate; set => inclusionDate = value; }
        public string User { get => user; set => user = value; }
        public bool ThirdParty { get => thirdParty; set => thirdParty = value; }
        public string Area { get => area; set => area = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
        public bool Adm {get=>adm;set=>adm=value;}

        public bool IsActive { get => isActive;set=> isActive = value;}
    }
}
