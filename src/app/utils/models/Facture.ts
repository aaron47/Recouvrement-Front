import {Client} from "./Client";

export type Facture = {
  id: number;
  client: Client;
  montant: number;
  dateFacture: string;
  description: string[];
  dateEcheance: string[];
}
