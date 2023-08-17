import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FacturePage } from "./pages/facture/facture.page";
import { ClientCardComponent } from "./components/client-card/client-card.component";
import { FactureModule } from "./pages/facture/facture.module";
import { HomePage } from "./pages/home/home.page";

@NgModule({
	declarations: [
		AppComponent,
		ClientCardComponent,
		HomePage,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FactureModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {
}
