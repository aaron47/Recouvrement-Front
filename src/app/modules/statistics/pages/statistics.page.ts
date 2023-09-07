import { Component, OnInit } from "@angular/core";
import { StatisticsService } from "../services/statistics.service";
import { Observable } from "rxjs";
import { ClientStatisticsByCycle, ClientStatisticsByRole } from "src/app/shared/models/ClientStatistics";

@Component({
	selector: "app-statistics",
	templateUrl: "./statistics.page.html",
})
export class StatisticsPage implements OnInit {
  statistics$!: Observable<ClientStatisticsByRole & ClientStatisticsByCycle>;

	constructor(private readonly statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.statisticsService.fetchAllStatistics$().subscribe((res) => console.log("RESPONSE: ", res));
  }
}
