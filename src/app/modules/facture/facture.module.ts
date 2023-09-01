import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FacturePage } from "./pages/facture/facture.page";
import { FactureTableComponent } from "./components/facture-table/facture-table.component";
import { CoreModule } from "@core/core.module";
import { FilterFactureDialogComponent } from "./components/filter-facture-dialog/filter-facture-dialog.component";

@NgModule({
	declarations: [
		FacturePage,
		FactureTableComponent,
		FilterFactureDialogComponent,
	],
	imports: [ReactiveFormsModule, CommonModule, CoreModule, CurrencyPipe],
})
export class FactureModule {}
