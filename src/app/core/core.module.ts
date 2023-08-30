import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SendEmailDialogComponent } from "./components/dialogs/send-email-dialog/send-email-dialog.component";
import { FilterClientsDialogComponent } from "./components/dialogs/filter-clients-dialog/filter-clients-dialog.component";
import { LoginPage } from "./pages/login/login.page";
import { ClientsModule } from "../modules/clients/clients.module";
import { HomePage } from "./pages/home/home.page";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [
		SendEmailDialogComponent,
		FilterClientsDialogComponent,
		LoginPage,
    HomePage,
	],
	exports: [SendEmailDialogComponent, FilterClientsDialogComponent, LoginPage, HomePage],
	imports: [CommonModule, ClientsModule, ReactiveFormsModule, FormsModule],
})
export class CoreModule {}
