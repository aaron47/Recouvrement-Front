import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	OnInit,
} from "@angular/core";
import { BehaviorSubject, first, map, startWith } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AppState } from "@utils";
import { Client, FilterClients } from "@models";
import { ApiService, AuthService } from "@services";
import { DataState } from "@enums";

@Component({
	selector: "app-home",
	templateUrl: "./home.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
	private dataSubject = new BehaviorSubject<AppState<Client[]> | null>(null);
	clientsState$ = this.dataSubject.asObservable().pipe(takeUntilDestroyed());
	private clientsData: Client[] = [];

	searchTerm$ = new BehaviorSubject<string>("");
	searchTerm = "";

	showFilterOptions = false;

	constructor(
		private readonly apiService: ApiService,
		private readonly authService: AuthService,
		private readonly destroyRef: DestroyRef,
	) {}

	ngOnInit(): void {
		this.apiService.clients$
			.pipe(
				map((response) => {
					this.clientsData = response.data?.["clients"];
					this.updateClientsState(this.clientsData);
				}),
				startWith({
					dataState: DataState.LOADING,
					errorMessage: "",
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}

	toggleFilterOptions() {
		this.showFilterOptions = !this.showFilterOptions;
	}

	search() {
		this.searchTerm$.next(this.searchTerm);

		const filteredClients = this.clientsData.filter(
			(client) =>
				client.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				client.email.toLowerCase().includes(this.searchTerm.toLowerCase()),
		);

		this.updateClientsState(filteredClients);
	}

	filterClients(filter: FilterClients) {
		let filteredClients = this.clientsData;

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

		filteredClients = filteredClients.filter(
			(client) =>
				client.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
				client.email.toLowerCase().includes(this.searchTerm.toLowerCase()),
		);

		this.updateClientsState(filteredClients);
	}

	private updateClientsState(clients: Client[]) {
		const state = {
			dataState: DataState.LOADED,
			appData: clients,
			errorMessage: "",
		};

		this.dataSubject.next(state);
		this.clientsState$ = this.dataSubject
			.asObservable()
			.pipe(takeUntilDestroyed(this.destroyRef));
	}

	logout() {
		this.authService.logout().pipe(first()).subscribe();
	}
}
