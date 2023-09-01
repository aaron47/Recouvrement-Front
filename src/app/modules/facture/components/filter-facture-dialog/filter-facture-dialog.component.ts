import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FactureService } from "../../services/facture.service";

@Component({
	selector: "app-filter-facture-dialog",
	templateUrl: "./filter-facture-dialog.component.html",
})
export class FilterFactureDialogComponent {
	filterFactureForm!: FormGroup;
	@Output() close = new EventEmitter<void>();

	constructor(
		private readonly factureService: FactureService,
		private readonly formBuilder: FormBuilder,
	) {
		const startDate = localStorage.getItem("startDate") || null;
		const endDate = localStorage.getItem("endDate") || null;

		this.filterFactureForm = this.formBuilder.group({
			startDate: [startDate],
			endDate: [endDate],
		});
	}

	onSubmit() {
		localStorage.setItem("startDate", this.filterFactureForm.value.startDate);
		localStorage.setItem("endDate", this.filterFactureForm.value.endDate);
		const startDate = new Date(this.filterFactureForm.value.startDate);
		const endDate = new Date(this.filterFactureForm.value.endDate);
		this.factureService.filterFacturesByDate(startDate, endDate);
		this.close.emit();
	}

	closeDialog(): void {
		this.close.emit();
	}
}
