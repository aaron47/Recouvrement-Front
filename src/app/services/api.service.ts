import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {
  ALL_CLIENTS_URL,
  ALL_FACTURES_BY_CLIENT_URL,
  ALL_FACTURES_URL,
  BASE_URL,
  SINGLE_CLIENT_URL, SINGLE_FACTURE_URL
} from "../utils/ApiUrls";
import {Client} from "../utils/models/Client";
import {ResponseHelper} from "../utils/models/ResponseHelper";
import {tap} from "rxjs";
import {Facture} from "../utils/models/Facture";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private readonly http: HttpClient
  ) {
  }

  public $clients = this.http.get<ResponseHelper<Client[]>>(
    ALL_CLIENTS_URL
  );

  public $client = this.http.get<ResponseHelper<Client>>(
    SINGLE_CLIENT_URL
  );

  public $factures = this.http.get<ResponseHelper<Facture[]>>(
    ALL_FACTURES_URL
  );

  public facturesByClient$ = (clientId: string) => this.http.get<ResponseHelper<Facture[]>>(
    ALL_FACTURES_BY_CLIENT_URL + clientId
  );

  public $facture = () => this.http.get<ResponseHelper<Facture>>(
    SINGLE_FACTURE_URL + 1
  ).pipe(tap(res => console.log(res)));
}
