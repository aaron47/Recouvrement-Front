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
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
