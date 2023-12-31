import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Client } from "@models";

@Component({
	selector: "app-client-table",
	templateUrl: "./client-table.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTableComponent {
	@Input({ required: true }) clients!: Client[];

	constructor(private readonly router: Router) {}

	p: number = 1;

	tableColumns = [
		{ name: "Id", icon: "tag" },
		{ name: "Nom", icon: "badge" },
		{ name: "Email De Contacte", icon: "mail" },
		{ name: "Societe", icon: "business" },
		{ name: "Addresse De Facturation", icon: "location_on" },
		{ name: "Type", icon: "person" },
		{ name: "Telephone", icon: "call" },
		{ name: "Cycle De Facturation", icon: "calendar_month" },
	];

	trackByFnColumn(index: number, column: { name: string; icon: string }) {
		return column.name;
	}

	trackByFnClient(index: number, client: Client) {
		return client.id;
	}

	navigateToFactures(clientId: number) {
		this.router.navigate(["factures", clientId]);
	}

	onPageChange(pageNumber: number) {
		this.p = pageNumber;
		window.scrollTo(0, 0);
	}

	calculateItemsPerPage(): number {
		const totalClients = this.clients.length;

		if (totalClients <= 100) {
			return totalClients;
		} else if (totalClients <= 500) {
			const minPageSize = Math.ceil(totalClients / 10); // dividing by maximum desired pages
			const maxPageSize = Math.ceil(totalClients / 5); // dividing by minimum desired pages

			// Check which page size is closest to 100 and return that
			return Math.abs(100 - minPageSize) < Math.abs(100 - maxPageSize)
				? minPageSize
				: maxPageSize;
		} else if (totalClients <= 1000) {
			return 100;
		} else {
			return 200;
		}
	}
}
