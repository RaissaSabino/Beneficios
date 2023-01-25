
export interface EventsBeneficiaryProduct {
    id : number,
    quantity: number,
    unitCost: number,
    deliveredDate: string,
    deliveredBeneficiary: number,
    eventosBeneficiario: {
        id:number,
        evento: {
            name:string
            id:number
        }
    },
    produto: {
        id: number,
        name:string
    }
}