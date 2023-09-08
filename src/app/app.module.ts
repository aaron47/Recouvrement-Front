import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { FactureModule } from "./modules/facture/facture.module";
import { ToastrModule } from "ngx-toastr";
import { NgChartsModule } from "ng2-charts";
import { StatisticsModule } from "./modules/statistics/statistics.module";

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FactureModule,
		HttpClientModule,
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: "toast-bottom-right",
			preventDuplicates: true,
		}),
		NgChartsModule,
		StatisticsModule
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
