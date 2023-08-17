import { Component, Input } from "@angular/core";
import { Facture } from "../../utils/models/Facture";

@Component({
  selector: "app-facture-details",
  templateUrl: "./facture-details.page.html",
  styleUrls: ["./facture-details.page.css"],
})
export class FactureDetailsPage {
  @Input({ required: true }) facture!: Facture;
}
