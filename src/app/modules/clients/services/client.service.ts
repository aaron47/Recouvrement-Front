import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Client, FilterClients } from "@models";
import { AppState } from "@utils";
import { DataState } from "@enums";
import { ApiService } from "@services";
import { map, startWith } from "rxjs/operators";

@Injectable({
	providedIn: "root",
})
export class ClientService {
	private dataSubject = new BehaviorSubject<AppState<Client[]> | null>(null);
	clientsState$ = this.dataSubject.asObservable();
	private originalClientsData: Client[] = [];
	clientsData: Client[] = [];

	constructor(private readonly apiService: ApiService) {
		this.loadClients();
	}

	private loadClients(): void {
		this.apiService.clients$
			.pipe(
				map((response) => {
					this.originalClientsData = response.data?.["clients"];
					this.clientsData = [...this.originalClientsData];
					this.updateClientsState(this.clientsData);
				}),
				startWith({
					dataState: DataState.LOADING,
					errorMessage: "",
				}),
			)
			.subscribe();
	}

	updateClientsState(clients: Client[]) {
		const state = {
			dataState: DataState.LOADED,
			appData: clients,
			errorMessage: "",
		};

		this.dataSubject.next(state);
	}

	search(term: string) {
		this.clientsData = this.originalClientsData.filter((client) => {
			const clientFullName = `${
				client.nom.toLowerCase
			}${client.prenom.toLocaleLowerCase()}`;

			return (
				clientFullName.includes(term.toLowerCase()) ||
				client.email.toLowerCase().includes(term.toLowerCase())
			);
		});

		this.updateClientsState(this.clientsData);
	}

	filterClients(filter: FilterClients) {
		let filteredClients = this.originalClientsData;

		if (filter.type !== "TOUS") {
			filteredClients = filteredClients.filter(
				(client) => client.type === filter.type,
			);
		}

		if (filter.cycle !== "TOUS") {
			filteredClients = filteredClients.filter(
				(client) => client.cycle === filter.cycle,
			);
		}

		this.clientsData = filteredClients;
		this.updateClientsState(this.clientsData);
	}
}
