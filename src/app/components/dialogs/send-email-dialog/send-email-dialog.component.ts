import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Facture } from "../../../utils/models/Facture";

@Component({
  selector: "app-send-email-dialog",
  templateUrl: "./send-email-dialog.component.html",
  styleUrls: ["./send-email-dialog.component.css"],
})
export class SendEmailDialogComponent {
  @Input({ required: true }) facture!: Facture;
  @Output() close = new EventEmitter<void>();

  closeDialog(): void {
    this.close.emit();
  }
}
