import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FacturePage } from "./facture.page";
import { FactureCardComponent } from "../../components/facture-card/facture-card.component";

@NgModule({
  declarations: [FacturePage, FactureCardComponent],
  imports: [
    CommonModule,
  ],
})
export class FactureModule {
}
