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
		this.filterClientsForm = this.formBuilder.group({
			type: ["TOUS", []],
			cycle: ["TOUS", []],
		});
	}

	onSubmit(): void {
		console.log(this.filterClientsForm.value);
		this.filterClients.emit(this.filterClientsForm.value);
		this.closeDialog();
	}

	closeDialog(): void {
		this.close.emit();
	}
}
