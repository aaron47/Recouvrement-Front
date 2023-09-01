import { first } from "rxjs";
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Facture } from "@models";
import { FactureService } from "../../services/facture.service";
import { AuthService } from "@services";

@Component({
	selector: "app-facture-details",
	templateUrl: "./facture.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FacturePage implements OnInit {
	selectedFacture: Facture | null = null;
	isDialogToggled = false;
	isFilterFactureDialogToggled = false;

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

	handleFilterFactureDialog() {
		this.isFilterFactureDialogToggled = !this.isFilterFactureDialogToggled;
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
