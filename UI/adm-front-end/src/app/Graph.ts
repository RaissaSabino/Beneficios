export interface Graph {
    id: number,
    quantity: number,
    deliveredQuantity : number,
    stockTotal: number,
    stockRestante: number,
    evento: {
        id: number,
        name: string,
        description: string,
        startDate: Date,
        endDate: Date,
        isActive: boolean
    }
    produto: {
        id: number,
        name: string
    }
}