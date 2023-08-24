import { Subject, first, takeUntil } from "rxjs";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FactureService } from "../../services/facture.service";
import { Facture } from "../../utils/models/Facture";
import { AuthService } from "src/app/services/auth.service";

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
		private readonly authService: AuthService,
		private readonly route: ActivatedRoute,
		private readonly location: Location,
	) {}

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
		this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
			let id: string = params["clientId"];
			this.factureService
				.fetchFacturesByClient(id)
				.pipe(takeUntil(this.unsubscribe$))
				.subscribe();
		});
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}

	logout() {
		this.authService.logout().pipe(first()).subscribe();
	}
}
