export interface ServiceType {
  id: number;
  name: string;
}
export interface ServiceOrderType {
  id?: number;
  name: string;
  status: string;
  orderId?: number;
  value: any;
}