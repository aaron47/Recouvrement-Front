import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Client } from "../../utils/models/Client";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";

@Component({
  selector: "app-client-card",
  templateUrl: "./client-card.component.html",
  styleUrls: ["./client-card.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientCardComponent {
  @Input({ required: true }) client!: Client;

  constructor(
    private readonly router: Router,
  ) {
  }

  navigateToFactures(clientId: number) {
    this.router.navigate(["factures", clientId]).then(() => {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          // Code to execute after navigation is complete
          console.log("Navigation to factures route complete");
        });
    });
  }
}
