import { ClientType } from "./clientType";

export interface OrderType {
    id?:number
    status: string;

    clientId?: number;
    userId?: number;
    shelfId?: number;

    model: string
    brand:string;
    name:string;
    serialNumber:string;

    charger:boolean;
    battery:boolean;
    energyCable:boolean;
    bag:boolean;
    others?:string;

    warranty:boolean;
    warrantyDescription?:string;

    backup:boolean;
    backupDescription?:string;

    defectDescription?:string;
    technicalReport?:string;
    equipamentPassword?:string;
    generalDescription?:string;

    deliveryConfirmation:boolean;

    value?:number;
}
