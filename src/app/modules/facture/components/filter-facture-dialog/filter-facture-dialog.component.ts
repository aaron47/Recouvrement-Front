import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

		this.filterFactureForm = this.formBuilder.group(
			{
				startDate: [startDate],
				endDate: [endDate],
			},
			{ validators: this.dateRangeValidator },
		);
	}

	onSubmit() {
		if (this.filterFactureForm.invalid) {
			return;
		}

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

	private dateRangeValidator(formGroup: FormGroup) {
		const startDate = formGroup.get("startDate")!.value;
		const endDate = formGroup.get("endDate")!.value;

		if (startDate && endDate && (startDate > endDate || endDate < startDate)) {
			return { dateRangeError: true };
		}

		return null;
	}
}
