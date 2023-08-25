import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ClientCardComponent } from "./components/client-card/client-card.component";
import { FactureModule } from "./pages/facture/facture.module";
import { HomePage } from "./pages/home/home.page";
import { LoginPage } from "./pages/login/login.page";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
	declarations: [AppComponent, ClientCardComponent, HomePage, LoginPage],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FactureModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
