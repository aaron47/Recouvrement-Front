import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	Output,
} from "@angular/core";
import { Facture } from "@models";

@Component({
	selector: "app-facture-table",
	templateUrl: "./facture-table.component.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FactureTableComponent {
	@Input({ required: true }) factures!: Facture[];
	@Output() openDialog = new EventEmitter<Facture>();

	tableColumns = [
		{ name: "Id", icon: "tag" },
		{ name: "Client", icon: "badge" },
		{ name: "Montant", icon: "attach_money" },
		{ name: "Date De Facturation", icon: "calendar_today" },
		{ name: "Date D'échéance", icon: "calendar_today" },
		{ name: "Description", icon: "description" },
		{ name: "Status", icon: "payments" },
	];

	trackByFnColumn(index: number, column: { name: string; icon: string }) {
		return column.name;
	}

	trackByFnFacture(index: number, facture: Facture) {
		return facture.id;
	}

	onOpenDialog(facture: Facture) {
		this.openDialog.emit(facture);
	}
}
