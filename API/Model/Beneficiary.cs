using DTO;
using Microsoft.EntityFrameworkCore;
namespace Model;
public class Beneficiary : IValidateDataObject, IDataController<BeneficiaryDTO,Beneficiary>
{
	private int id;
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

    public int Id { get => id; set => id = value; }
    public string Name { get => name; set => name = value; }
    public string Edv { get => edv; set => edv = value; }
    public string Cpf { get => cpf; set => cpf = value; }
    public DateTime InclusionDate { get => inclusionDate; set => inclusionDate = value; }
    public string User { get => user; set => user = value; }
    public bool ThirdParty { get => thirdParty; set => thirdParty = value; }
    public string Area { get => area; set => area = value; }
    public DateTime BirthDate { get => birthDate; set => birthDate = value; }
    public bool Adm{get=>adm;set=>adm=value;}

    public bool IsActive { get => isActive; set=> isActive = value; }
    public bool validateObject()
    {
        if (this.name == null)
        {
            return false;
        }
        if (this.edv == null)
        {
            return false;
        }
        if(this.cpf == null)
        {
            return false;
        }
        if (this.inclusionDate == null)
        {
            return false;
        }
        if (this.user == null)
        {
            return false;
        }
        if (this.thirdParty == null)
        {
            return false;
        }
        if (this.area == null)
        {
            return false;
        }
        if (this.birthDate == null)
        {
            return false;
        }
        if (this.adm == null)
        {
            return false;
        }
        return true;
    }

    public int save()
    {
        int id = 0;
        using (var context = new Context())
        {
            var beneficiary = new Beneficiary()
            {
                name = this.name,
                edv = this.edv,
                cpf = this.cpf,
                inclusionDate = DateTime.Now,
                user = this.user,
                thirdParty = false,
                area = this.area,
                birthDate = this.birthDate,
                adm=this.adm,
                isActive = this.IsActive
            };
            context.beneficiary.Add(beneficiary);
            context.SaveChanges();
            id = beneficiary.id;
        }
        return id;
    }

    public int saveThirdParty(int iduser, int evento)
    {
        int id = 0;
        using (var context = new Context())
        {
            var beneficiaryThird = new Beneficiary()
            {
                name = this.name,
                edv = "",
                cpf = this.cpf,
                inclusionDate = DateTime.Now,
                user = "",
                ThirdParty = true,
                area = "",
                birthDate = DateTime.Now,
                adm=false,
                isActive=true
            };
            context.beneficiary.Add(beneficiaryThird);
            context.SaveChanges();
            id = beneficiaryThird.id;
        }
        return id;
    }
    public static int updateThird(int id,int evento, int iduser)
    {
        using (var context = new Context())
        {
            var eventsBeneficiaryy = context.eventsBeneficiary.Include(e=>e.Evento).Include(e => e.Beneficiario)
                .FirstOrDefault(e=> e.Evento.Id==evento && e.Beneficiario.Id==iduser);
            if(eventsBeneficiaryy != null)
            {
                eventsBeneficiaryy.BeneficiarioNomeado = id;
            }
            context.SaveChanges();
        }
        return id;
    }
    public static void update(BeneficiaryDTO beneficiaryDTO)
    {
        using (var context = new Context())
        {
            var beneficiary = context.beneficiary.FirstOrDefault(a => a.Edv == beneficiaryDTO.Edv);
            if (beneficiary != null)
            {
                if (beneficiaryDTO.Area != null && beneficiaryDTO.Area != "")
                {
                    beneficiary.Area = beneficiaryDTO.Area;
                }
                if (beneficiaryDTO.Cpf != null && beneficiaryDTO.Cpf != "")
                {
                    beneficiary.Cpf = beneficiaryDTO.Cpf;
                }
                if (beneficiaryDTO.User != null && beneficiaryDTO.User != "")
                {
                    beneficiary.User = beneficiaryDTO.User;
                }
                if (beneficiaryDTO.Name != null && beneficiaryDTO.Name != "")
                {
                    beneficiary.Name = beneficiaryDTO.Name;
                }
                if (beneficiaryDTO.BirthDate != null)
                {
                    beneficiary.birthDate = beneficiaryDTO.BirthDate;
                }
                if (beneficiaryDTO.ThirdParty != null)
                {
                    beneficiary.ThirdParty = beneficiaryDTO.ThirdParty;
                }
                 if (beneficiaryDTO.Adm != null)
                {
                    beneficiary.adm = beneficiaryDTO.Adm;
                }
                beneficiary.isActive = beneficiaryDTO.IsActive;
            }
            context.SaveChanges();
        }
    }

    public static void delete(Beneficiary beneficiary)
    {
        using (var context = new Context())
        {
            var beneficiarys = context.beneficiary.FirstOrDefault(i => i.Edv == beneficiary.Edv);

            context.beneficiary.Remove(beneficiarys);

            context.SaveChanges();
        }
    }

    public static List<object> findAll()
    {
        using (var context = new Context())
        {
            var bene = context.beneficiary;

            Console.Write(bene);

            List<object> beneficiarys = new List<object>();

            foreach (var item in bene)
            {
                beneficiarys.Add(item);
            }

            return beneficiarys;
        }
    }

    public static IEnumerable<object> PesquisaBeneficiary(PesquisaBeneficiary pesquisa)
    {
        using (var context = new Context())
        {
            var beneficiary = context.beneficiary.ToList();
            if (pesquisa.edv != "") beneficiary = beneficiary.Where(e => e.Edv.Contains(pesquisa.edv)).ToList();
            if (pesquisa.name != "") beneficiary = beneficiary.Where(e => e.Name.ToLower().Contains(pesquisa.name.ToLower())).ToList();
            if (pesquisa.adm != "")
            {
                if(pesquisa.adm == "true") beneficiary = beneficiary.Where(e => e.Adm == true).ToList();
                else beneficiary = beneficiary.Where(e => e.Adm == false).ToList();
            }
            if (pesquisa.isActive != "")
            {
                if (pesquisa.isActive == "true") beneficiary = beneficiary.Where(e => e.isActive == true).ToList();
                else beneficiary = beneficiary.Where(e => e.isActive == false).ToList();
            }
            return beneficiary;
        }
    }

    public BeneficiaryDTO convertModelToDTO()
    {
        var beneficiaryDTO = new BeneficiaryDTO();
        beneficiaryDTO.Name = this.name;
        beneficiaryDTO.BirthDate = this.birthDate;
        beneficiaryDTO.Cpf = this.cpf;
        beneficiaryDTO.Edv = this.edv;
        beneficiaryDTO.InclusionDate = this.inclusionDate;
        beneficiaryDTO.User = this.user;
        beneficiaryDTO.ThirdParty = this.thirdParty;
        beneficiaryDTO.Area = this.area;
        beneficiaryDTO.Adm=this.adm;
        beneficiaryDTO.IsActive = this.isActive;
        return beneficiaryDTO;
    }

    public static Beneficiary convertDTOToModel(BeneficiaryDTO obj)
    {
        Beneficiary beneficiary = new Beneficiary();
        beneficiary.Name = obj.Name;
        beneficiary.BirthDate = obj.BirthDate;
        beneficiary.Cpf = obj.Cpf;
        beneficiary.Edv = obj.Edv;
        beneficiary.InclusionDate = obj.InclusionDate;
        beneficiary.User = obj.User;
        beneficiary.ThirdParty = obj.ThirdParty;
        beneficiary.Area = obj.Area;
        beneficiary.Adm=obj.Adm;
        beneficiary.isActive = obj.IsActive;
        return beneficiary;
    }
    public static object findID(string edv)
    {
        using (var context = new Context())
        {
            var beneficiarys = context.beneficiary.FirstOrDefault(d => d.Edv == edv);
            return new
            {
                Name = beneficiarys.Name,
                Cpf = beneficiarys.Cpf,
                Edv = beneficiarys.Edv,
                InclusionDate = beneficiarys.InclusionDate,
                User = beneficiarys.User,
                BirthDate = beneficiarys.BirthDate,
                Area = beneficiarys.Area,
                ThirdParty = beneficiarys.ThirdParty,
                Id=beneficiarys.Id                
            };
        }
    }

    public static object findCPF(string cpf)
    {
        using (var context = new Context())
        {
            var beneficiarys = context.beneficiary.FirstOrDefault(d => d.Cpf == cpf);
            return new
            {
                Name = beneficiarys.Name,
                Cpf = beneficiarys.Cpf,
                Edv = beneficiarys.Edv,
                InclusionDate = beneficiarys.InclusionDate,
                User = beneficiarys.User,
                BirthDate = beneficiarys.BirthDate,
                Area = beneficiarys.Area,
                ThirdParty = beneficiarys.ThirdParty
            };
        }
    }

    public static Beneficiary findByUser(String cpf, string date)
    {
        DateTime newdataa=Convert.ToDateTime(date);
        Console.WriteLine(newdataa);
        using (var context = new Context())
        {
            var beneficiaryFind = context.beneficiary.FirstOrDefault(o => o.Cpf == cpf && o.BirthDate.Day== newdataa.Day && o.BirthDate.Month== newdataa.Month && o.BirthDate.Year== newdataa.Year );
            //Console.WriteLine(beneficiaryFind.birthDate);
            if(beneficiaryFind != null){

                return beneficiaryFind;
                Console.WriteLine("ACHOU");
            }

            return null;
        }
    }
    public static Beneficiary findByUserAdm(string edv, string date)
    {
        DateTime newdataa=Convert.ToDateTime(date);
        Console.WriteLine(newdataa);
        using (var context = new Context())
        {
            var beneficiaryFind = context.beneficiary.FirstOrDefault(o => o.Edv == edv && o.BirthDate.Day== newdataa.Day && o.BirthDate.Month== newdataa.Month && o.BirthDate.Year== newdataa.Year );
            //Console.WriteLine(beneficiaryFind.birthDate);
            if(beneficiaryFind.adm == true){

                return beneficiaryFind;
                Console.WriteLine("ACHOU");
            }

            return null;
        }
    }

    public static object findId(int id)
    {
        using (var context = new Context())
        {
            var beneficiarys = context.beneficiary.FirstOrDefault(d => d.Id == id);
            return new
            {
                Name = beneficiarys.Name,
                Cpf = beneficiarys.Cpf,
                Edv = beneficiarys.Edv,
                InclusionDate = beneficiarys.InclusionDate,
                User = beneficiarys.User,
                BirthDate = beneficiarys.BirthDate,
                Area = beneficiarys.Area,
                ThirdParty = beneficiarys.ThirdParty,
                Id = id
            };
        }
    }

    public static int FindBeneficiaryID(string edv)
    {
        using (var context = new Context())
        {
            var beneficiary = context.beneficiary.FirstOrDefault(s => s.Edv == edv);
            return beneficiary.Id;
        }
    }

    public BeneficiaryDTO findById(int id)
    {
        return new BeneficiaryDTO();
    }

    public List<BeneficiaryDTO> getAll() { return new List<BeneficiaryDTO>(); }
}