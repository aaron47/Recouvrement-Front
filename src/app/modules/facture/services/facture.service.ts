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
	private factureDataSubject = new BehaviorSubject<AppState<Facture[]> | null>(
		null,
	);
	factureData$ = this.factureDataSubject.asObservable();
	private originalFactureData: Facture[] = [];
	factureData: Facture[] = [];

	constructor(private readonly apiService: ApiService) {}

	fetchFacturesByClient(clientId: string) {
		return this.apiService.facturesByClient$(clientId).pipe(
			map((response) => {
				this.originalFactureData = response.data?.["factures"];
				this.factureData = [...this.originalFactureData];
				this.updateFactureState(this.factureData);

				// return {
				// 	dataState: DataState.LOADED,
				// 	appData: response,
				// 	errorMessage: response.message,
				// };
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

	// filterFacturesByDate(startDate: Date, endDate: Date) {
	// 	this.factureDataSubject
	// 		.pipe(
	// 			map((state) => {
	// 				if (state && state.appData) {
	// 					const filteredFactures = state.appData.filter((facture) => {
	// 						const factureDate = new Date(facture.dateEcheance);
	// 						return factureDate >= startDate && factureDate <= endDate;
	// 					});

	// 					return {
	// 						...state,
	// 						appData: [...filteredFactures],
	// 					};
	// 				}
	// 				return state;
	// 			}),
	// 		)
	// 		.subscribe((filteredState) => {
	// 			this.factureDataSubject.next(filteredState!);
	// 		});
	// }

	filterFacturesByDate(startDate: Date, endDate: Date) {
		let filteredFactures = this.originalFactureData.filter((facture) => {
			const factureDate = new Date(facture.dateEcheance);
			return factureDate >= startDate && factureDate <= endDate;
		});

		this.factureData = filteredFactures;
		this.updateFactureState(this.factureData);
	}

	private updateFactureState(factures: Facture[]) {
		const state = {
			dataState: DataState.LOADED,
			appData: factures,
			errorMessage: "",
		};

		this.factureDataSubject.next(state);
	}
}
