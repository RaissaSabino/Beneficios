export interface EventsBeneficiaryProduct {
    id : number,
    quantity: number,
    unitCost: number,
    nomeTerceiro: string,
    nomeBeneficiario: string,
    deliveredDate: string,
    deliveredQuantity: number,
    stock: number
    deliveredBeneficiary: {
        id: number
    },
    eventosBeneficiario: {
        id: number,
        beneficiario: {
            id: number,
            name: string
        },
        beneficiarioNomeado: number
    },
    produto: {
        id: number,
        name: string,
    },
    station: {
        id: number,
        ipAddress: string,
        isActive: boolean
    },
    evento: {
        id: number,
        name: string
    }
}