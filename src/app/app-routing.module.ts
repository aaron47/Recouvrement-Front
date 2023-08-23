import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FacturePage } from "./pages/facture/facture.page";
import { HomePage } from "./pages/home/home.page";
import { LoginPage } from "./pages/login/login.page";
import { authGuard } from "./guards/auth.guard";
import { loginPageGuard } from "./guards/login-page.guard";

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
