import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { BehaviorSubject, first } from "rxjs";
import { FilterClients } from "@models";
import { AuthService } from "@services";
import { ClientService } from "src/app/modules/clients/services/client.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-home",
	templateUrl: "./home.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
	searchTerm$ = new BehaviorSubject<string>("");
	searchTerm = "";

	showFilterOptions = false;

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
		protected readonly clientsService: ClientService,
	) {}

	ngOnInit(): void {}

	toggleFilterOptions() {
		this.showFilterOptions = !this.showFilterOptions;
	}

	search() {
		this.searchTerm$.next(this.searchTerm);
		this.clientsService.search(this.searchTerm);
	}

	filterClients(filter: FilterClients) {
		this.clientsService.filterClients(filter);
	}

	logout() {
		this.authService.logout().pipe(first()).subscribe();
	}

	navigateToStatistics() {
		this.router.navigate(["statistics"]);
	}
}
