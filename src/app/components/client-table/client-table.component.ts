import { Component, Input } from "@angular/core";
import { Client } from "src/app/utils/models/Client";

@Component({
	selector: "app-client-table",
	templateUrl: "./client-table.component.html",
	styleUrls: ["./client-table.component.css"],
})
export class ClientTableComponent {
	@Input({ required: true }) clients!: Client[];

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
}
