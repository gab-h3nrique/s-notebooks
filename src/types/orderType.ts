
export interface OrderType {
    id?:number
    status: string;
    clientId: number;
    userId:number
    shelfId?:number
    model: string
    brand:string;
    name:string;
    serialNumber:string;
    charger:boolean;
    battery:boolean;
    energyCable:boolean;
    bag:boolean;
    others:string;
    warranty:boolean;
    warrantyDescription:string;
    backup:boolean;
    backupDescription:string;
    defectDescription:string;
    technicalReport:string;
    generalDescription:string;
    deliveryConfirmation:boolean;
    value:number;
}

export interface EquipmentType {
    name: string;
    serialNumber?: string;
    brand: string;
    model: string;
}
export interface AccessoriesType {
    charger: boolean;
    battery: boolean;
    energyCable: boolean;
    bag: boolean;
    others: string;
}
export interface OrderInfoType {
    id?: number | null;
    backup: boolean;
    backupDescription?: string;
    defectDescription?: string;
    technicalReport?: string;
    generalDescription?: string;
    deliveryConfirmation: boolean;
    userId?: number | null;
    status: string;
    equipamentPassword: string;
}

