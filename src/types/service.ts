export interface ServiceType {
  id: number;
  name: string;
}
export interface ServiceOrderType {
  id: number | null;
  name: string;
  status: string;
  orderId: number | null;
  value: number;
}