import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { Client } from "@models";

@Component({
	selector: "app-client-table",
	templateUrl: "./client-table.component.html",
})
export class ClientTableComponent {
	@Input({ required: true }) clients!: Client[];

	constructor(
		private readonly router: Router,
	) {}

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

	navigateToFactures(clientId: number) {
		this.router.navigate(["factures", clientId]);
	}
}
