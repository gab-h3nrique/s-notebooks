export interface ServiceType {
  id?: number;
  name: string;
}
export interface ServiceOrderType {
  id?: number;
  name: string;
  status: string;
  type: string;
  orderId?: number;
  value: any;
}

export const EMPTY_SERVICE = { id: undefined, name: '' }