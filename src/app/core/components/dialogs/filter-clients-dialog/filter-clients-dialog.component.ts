import { Component, EventEmitter, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { FilterClients } from "@models";

@Component({
	selector: "app-filter-clients-dialog",
	templateUrl: "./filter-clients-dialog.component.html",
})
export class FilterClientsDialogComponent {
	filterClientsForm!: FormGroup;
	@Output() filterClients = new EventEmitter<FilterClients>();
	@Output() close = new EventEmitter<void>();

	constructor(private readonly formBuilder: FormBuilder) {
		const lastType = localStorage.getItem("lastType") || "TOUS";
		const lastCycle = localStorage.getItem("lastCycle") || "TOUS";

		this.filterClientsForm = this.formBuilder.group({
			type: [lastType, []],
			cycle: [lastCycle, []],
		});
	}

	onSubmit(): void {
		localStorage.setItem("lastType", this.filterClientsForm.value.type);
		localStorage.setItem("lastCycle", this.filterClientsForm.value.cycle);

		this.filterClients.emit(this.filterClientsForm.value);
		this.closeDialog();
	}

	closeDialog(): void {
		this.close.emit();
	}
}
