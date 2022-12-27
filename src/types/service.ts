export interface ServiceType {
  id: number;
  name: string;
}
export interface ServiceOrderType {
  id: number | undefined;
  name: string;
  status: string;
  orderId: number | null;
  value: number;
}