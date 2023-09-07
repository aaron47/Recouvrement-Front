import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FacturePage } from "./modules/facture/pages/facture/facture.page";
import { authGuard, loginPageGuard } from "@guards";
import { HomePage } from "@core/pages/home/home.page";
import { LoginPage } from "@core/pages/login/login.page";
import { StatisticsPage } from "./modules/statistics/pages/statistics.page";

const routes: Routes = [
	{
		path: "home",
		component: HomePage,
		canActivate: [authGuard],
	},
	{
		path: "login",
		component: LoginPage,
		// can still use class-based guards, just gotta use mapToCanActivate(GuardClass)
		canActivate: [loginPageGuard],
	},
	{
		path: "factures/:clientId",
		component: FacturePage,
		canActivate: [authGuard],
	},
	{
		path: "statistics",
		component: StatisticsPage,
		canActivate: [authGuard],
	},
	{
		path: "**",
		redirectTo: "home",
		pathMatch: "full",
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
