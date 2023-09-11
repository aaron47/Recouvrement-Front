import {
	ChangeDetectionStrategy,
	Component,
	DestroyRef,
	OnInit,
} from "@angular/core";
import { StatisticsService } from "../services/statistics.service";
import { Observable, tap } from "rxjs";
import {
	ClientStatisticsByCycle,
	ClientStatisticsByRole,
} from "src/app/shared/models/ClientStatistics";
import { ChartConfiguration } from "chart.js";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FactureStatistics } from "src/app/shared/models/FactureStatistics";
import { Location } from "@angular/common";

@Component({
	selector: "app-statistics",
	templateUrl: "./statistics.page.html",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsPage implements OnInit {
	statistics$!: Observable<
		ClientStatisticsByRole & ClientStatisticsByCycle & FactureStatistics
	>;

	public barChartLegend = true;
	public barChartPlugins = [];

	public clientTypeData: ChartConfiguration<"bar">["data"] | null = null;
	public cycleFacturationData: ChartConfiguration<"bar">["data"] | null = null;
	public factureData: ChartConfiguration<"bar">["data"] | null = null;

	public barChartOptions: ChartConfiguration<"bar">["options"] = {
		responsive: true,
		aspectRatio: 4,
	};

	constructor(
		private readonly statisticsService: StatisticsService,
		private readonly location: Location,
		private readonly destroyRef: DestroyRef,
	) {}

	ngOnInit(): void {
		this.statistics$ = this.statisticsService.fetchAllStatistics$().pipe(
			takeUntilDestroyed(this.destroyRef),
			tap((res) => {
				this.clientTypeData = {
					labels: ["Types Clients (en pourcentage)"],
					datasets: [
						{
							data: [res.personne],
							label: "PERSONNE",
						},
						{
							data: [res.societe],
							label: "SOCIETE",
						},
					],
				};

				this.cycleFacturationData = {
					labels: ["Cycles Facturation (en pourcentage)"],
					datasets: [
						{
							data: [res.trimestriel],
							label: "TRIMSTRIEL",
						},
						{
							data: [res.mensuel],
							label: "MENSUEL",
						},
						{
							data: [res.semestriel],
							label: "SEMESTRIEL",
						},
						{
							data: [res.annuel],
							label: "ANNUEL",
							backgroundColor: "#90EE90",
						},
					],
				};

				this.factureData = {
					labels: ["Status des factures (en pourcentage)"],
					datasets: [
						{
							data: [res.payee],
							label: "PAYEE",
						},
						{
							data: [res.impayee],
							label: "IMPAYEE",
						},
					],
				};
			}),
		);
	}

	navigateBack(): void {
		this.location.back();
	}
}
