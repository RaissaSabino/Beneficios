export interface StationProduct {
    id : number,
    station: {
        id: number
    },
    produtos: {
        id:number,
        eventos:{
            id: number
        }
    }
}