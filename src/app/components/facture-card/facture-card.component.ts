import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Facture } from "../../utils/models/Facture";

@Component({
  selector: "app-facture-card",
  templateUrl: "./facture-card.component.html",
  styleUrls: ["./facture-card.component.css"],
})
export class FactureCardComponent {
  @Input({ required: true }) facture!: Facture;
  @Output() openDialog = new EventEmitter<void>();

  onOpenDialog() {
    this.openDialog.emit();
  }
}
