import { Beneficiary } from './Beneficiary';

export interface BeneficiaryNomeado {
  beneficiario: Beneficiary;
  beneficiarioNomeado: Beneficiary;
  evento:{
    id:number;
  }
}
