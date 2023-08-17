import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FactureDetailsPage } from "./pages/facture-details/facture-details.page";

const routes: Routes = [
  {
    path: "facture-details",
    component: FactureDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
