import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	OnDestroy,
	OnInit,
} from "@angular/core";
import {
	BehaviorSubject,
	first,
	map,
	startWith,
	Subject,
	takeUntil,
} from "rxjs";
import { AppState } from "../../utils/app.state";
import { Client } from "../../utils/models/Client";
import { ApiService } from "../../services/api.service";
import { DataState } from "../../utils/enums/DataState";
import { AuthService } from "src/app/services/auth.service";
import { FilterClients } from "src/app/utils/models/FilterClients";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
	selector: "app-home",
	templateUrl: "./home.page.html",
	styleUrls: ["./home.page.css"],
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
				takeUntilDestroyed(this.destroyRef),
				map((response) => {
					this.clientsData = response.data?.["clients"];
					this.updateClientsState(this.clientsData);
				}),
				startWith({
					dataState: DataState.LOADING,
					errorMessage: "",
				}),
			)
			.subscribe();
	}

	toggleFilterOptions() {
		this.showFilterOptions = !this.showFilterOptions;
	}

	search() {
		this.searchTerm$.next(this.searchTerm);

		const filteredClients = this.clientsData.filter((client) =>
			client.nom.toLowerCase().includes(this.searchTerm.toLowerCase()),
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

		filteredClients = filteredClients.filter((client) =>
			client.nom.toLowerCase().includes(this.searchTerm.toLowerCase()),
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
		this.clientsState$ = this.dataSubject.asObservable().pipe(takeUntilDestroyed(this.destroyRef));
	}

	logout() {
		this.authService.logout().pipe(first()).subscribe();
	}
}
