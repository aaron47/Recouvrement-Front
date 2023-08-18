import { Subject, takeUntil } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FactureService } from "../../services/facture.service";
import { Facture } from "../../utils/models/Facture";

@Component({
  selector: "app-facture-details",
  templateUrl: "./facture.page.html",
  styleUrls: ["./facture.page.css"],
})
export class FacturePage implements OnInit, OnDestroy {
  private unsubscribe$: Subject<boolean> = new Subject();
  selectedFacture: Facture | null = null;
  isDialogToggled = false;

  constructor(
    protected readonly factureService: FactureService,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
  ) {
  }

  navigateBack(): void {
    this.location.back();
  }

  handleDialog(facture?: Facture) {
    if (facture) {
      this.selectedFacture = facture;
    }
    this.isDialogToggled = !this.isDialogToggled;
  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        params => {
          let id: string = params["clientId"];
          this.factureService.fetchFacturesByClient(id).subscribe();
        },
      );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

}
