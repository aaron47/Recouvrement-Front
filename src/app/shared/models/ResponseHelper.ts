import {Facture} from "./Facture";
import {Client} from "./Client";

export type ResponseHelper<T> = {
  timestamp: string;
  statusCode: number;
  status: string;
  message: string;
  data: {
    [key: string]: T
  }
}
