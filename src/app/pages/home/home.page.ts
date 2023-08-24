import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { BehaviorSubject, first, map, Observable, startWith } from "rxjs";
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
	clientsState$!: Observable<AppState<ResponseHelper<Client[]>>>;
	private dataSubject = new BehaviorSubject<ResponseHelper<Client[]> | null>(
		null,
	);

	constructor(
		private readonly apiService: ApiService,
		private readonly authService: AuthService,
	) {}

	ngOnInit(): void {
		this.clientsState$ = this.apiService.clients$.pipe(
			map((response) => {
				this.dataSubject.next(response);

				return {
					dataState: DataState.LOADED,
					appData: response,
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
