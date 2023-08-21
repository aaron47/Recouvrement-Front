import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FacturePage } from "./facture.page";
import { FactureCardComponent } from "../../components/facture-card/facture-card.component";
import { SendEmailDialogComponent } from "../../components/dialogs/send-email-dialog/send-email-dialog.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [FacturePage, FactureCardComponent, SendEmailDialogComponent],
	imports: [
		ReactiveFormsModule,
		CommonModule,
	],
})
export class FactureModule {
}
