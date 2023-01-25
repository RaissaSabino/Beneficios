import { Product } from "./Product";

export interface Estoque {
    id: number,
    quantity: number,
    unitCost: number,
    deliveredDate: Date,
    produto : Product
}