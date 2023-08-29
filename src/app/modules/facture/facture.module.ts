import { NgModule } from "@angular/core";
import { CommonModule, CurrencyPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { FacturePage } from "./pages/facture/facture.page";
import { FactureCardComponent } from "./components/facture-card/facture-card.component";
import { FactureTableComponent } from "./components/facture-table/facture-table.component";
import { CoreModule } from "@core/core.module";

@NgModule({
	declarations: [FacturePage, FactureCardComponent, FactureTableComponent],
	exports: [FacturePage, FactureCardComponent, FactureTableComponent],
	imports: [ReactiveFormsModule, CommonModule, CoreModule, CurrencyPipe],
})
export class FactureModule {}
