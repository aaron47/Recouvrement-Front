import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FacturePage } from "./pages/facture/facture.page";
import { HomePage } from "./pages/home/home.page";

const routes: Routes = [
  {
    path: "home",
    component: HomePage,
  },
  {
    path: "factures/:clientId",
    component: FacturePage,
  },
  {
    path: "**",
    redirectTo: "home",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
