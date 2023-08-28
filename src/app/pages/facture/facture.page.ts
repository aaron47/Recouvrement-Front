import { first } from "rxjs";
import { Component, DestroyRef, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FactureService } from "../../services/facture.service";
import { Facture } from "../../utils/models/Facture";
import { AuthService } from "src/app/services/auth.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
	selector: "app-facture-details",
	templateUrl: "./facture.page.html",
	styleUrls: ["./facture.page.css"],
})
export class FacturePage implements OnInit {
	selectedFacture: Facture | null = null;
	isDialogToggled = false;

	constructor(
		protected readonly factureService: FactureService,
		private readonly authService: AuthService,
		private readonly route: ActivatedRoute,
		private readonly location: Location,
		private readonly destroyRef: DestroyRef,
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

	ngOnInit(): void {
		this.route.params
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((params) => {
				let id: string = params["clientId"];
				this.factureService
					.fetchFacturesByClient(id)
					.pipe(takeUntilDestroyed(this.destroyRef))
					.subscribe();
			});
	}

	logout() {
		this.authService.logout().pipe(first()).subscribe();
	}
}
