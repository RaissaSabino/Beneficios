export interface EventsBeneficiary {
    id : number,
    beneficiario: {
        id: number,
        cpf: string,
        edv: string
    },
    beneficiarioNomeado: number,
    nomeado: number,
    edvIndicado: string,
    third: boolean,
    beneficiarioNomeadoThirdParty: boolean,
    evento: {
        id:number
    }
}