import { Injectable } from "@angular/core";
import { ApiService } from "@services";
import { Observable, forkJoin, mergeMap } from "rxjs";
import {
	ClientStatisticsByCycle,
	ClientStatisticsByRole,
} from "src/app/shared/models/ClientStatistics";
import { FactureStatistics } from "src/app/shared/models/FactureStatistics";

@Injectable({
	providedIn: "root",
})
export class StatisticsService {
	constructor(private readonly apiService: ApiService) {}

	fetchAllStatistics$(): Observable<
		ClientStatisticsByRole & ClientStatisticsByCycle & FactureStatistics
	> {
		return forkJoin({
			roleStats: this.apiService.getClientStatisticsByRole$(),
			cycleStats: this.apiService.getClientStatisticsByCycle$(),
			factureStats: this.apiService.getFactureStatistics$(),
		}).pipe(
			mergeMap((data) => {
				return [
					{
						...data.roleStats.data["statistics"],
						...data.cycleStats.data["statistics"],
						...data.factureStats.data["statistics"],
					},
				];
			}),
		);
	}
}
