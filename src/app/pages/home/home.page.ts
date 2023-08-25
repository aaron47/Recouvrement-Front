import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
	BehaviorSubject,
	first,
	map,
	Observable,
	startWith,
	combineLatest,
} from "rxjs";
import { AppState } from "../../utils/app.state";
import { ResponseHelper } from "../../utils/models/ResponseHelper";
import { Client } from "../../utils/models/Client";
import { ApiService } from "../../services/api.service";
import { DataState } from "../../utils/enums/DataState";
import { AuthService } from "src/app/services/auth.service";

@Component({
	selector: "app-home",
	templateUrl: "./home.page.html",
	styleUrls: ["./home.page.css"],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
	clientsState$!: Observable<AppState<Client[]>>;
	private dataSubject = new BehaviorSubject<Client[] | null>(null);

	searchTerm$ = new BehaviorSubject<string>("");
	searchTerm = "";

	constructor(
		private readonly apiService: ApiService,
		private readonly authService: AuthService,
	) {}

	ngOnInit(): void {
		this.clientsState$ = this.apiService.clients$.pipe(
			map((response) => {
				this.dataSubject.next(response.data?.["clients"]);

				return {
					dataState: DataState.LOADED,
					appData: response.data?.["clients"],
					errorMessage: "",
				};
			}),
			startWith({
				dataState: DataState.LOADING,
				errorMessage: "",
			}),
		);
	}

	search() {
		this.searchTerm$.next(this.searchTerm);

		this.clientsState$ = combineLatest([
			this.apiService.clients$,
			this.searchTerm$,
		]).pipe(
			map(([response, searchTerm]) => {
				const filteredClients = response.data?.["clients"].filter((client) =>
					client.nom.toLowerCase().includes(searchTerm.toLowerCase()),
				);

				this.dataSubject.next(filteredClients);

				return {
					dataState: DataState.LOADED,
					appData: filteredClients,
					errorMessage: "",
				};
			}),
			startWith({
				dataState: DataState.LOADING,
				errorMessage: "",
			}),
		);
	}

	logout() {
		this.authService.logout().pipe(first()).subscribe();
	}
}
