import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, of } from "rxjs";
import { Facture } from "../utils/models/Facture";
import { AppState } from "../utils/app.state";
import { ResponseHelper } from "../utils/models/ResponseHelper";
import { DataState } from "../utils/enums/DataState";
import { ApiService } from "./api.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FactureService {
  private factureDataSubject = new BehaviorSubject<AppState<ResponseHelper<Facture[]>> | null>(null);
  factureData$ = this.factureDataSubject.asObservable();

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  fetchFacturesByClient(clientId: string) {
    return this.apiService.facturesByClient$(clientId).pipe(
      map(response => {
        console.log(response);
        this.factureDataSubject.next({
          dataState: DataState.LOADED,
          appData: response,
          errorMessage: response.message,
        });

        return {
          dataState: DataState.LOADED,
          appData: response,
          errorMessage: response.message,
        }
      }),
      catchError(error => {
        this.factureDataSubject.next({
          dataState: DataState.ERROR,
          appData: undefined,
          errorMessage: error,
        });

        return of(null);
      }),
    );
  }
}
