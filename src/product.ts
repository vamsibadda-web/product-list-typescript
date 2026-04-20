export enum Status {
  Loading = "LOADING",
  Success = "SUCCESS",
  Error = "ERROR",
}
export interface Rating {
  rate: number;
  count: number;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: Rating;
}
export type ApiState<T> = {
  data: T[];
  status: Status;
};

