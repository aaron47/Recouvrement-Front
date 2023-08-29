import { Injectable } from "@angular/core";
import { DataState } from "@enums";
import { Facture, ResponseHelper } from "@models";
import { ApiService } from "@services";
import { AppState } from "@utils";
import { BehaviorSubject, catchError, of } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class FactureService {
	private factureDataSubject = new BehaviorSubject<AppState<
		ResponseHelper<Facture[]>
	> | null>(null);
	factureData$ = this.factureDataSubject.asObservable();

	constructor(private readonly apiService: ApiService) {}

	fetchFacturesByClient(clientId: string) {
		return this.apiService.facturesByClient$(clientId).pipe(
			map((response) => {
				this.factureDataSubject.next({
					dataState: DataState.LOADED,
					appData: response,
					errorMessage: response.message,
				});

				return {
					dataState: DataState.LOADED,
					appData: response,
					errorMessage: response.message,
				};
			}),
			catchError((error) => {
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