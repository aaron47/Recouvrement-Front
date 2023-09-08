import { NgChartsModule } from "ng2-charts";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StatisticsPage } from "./pages/statistics.page";

@NgModule({
	declarations: [StatisticsPage],
	imports: [CommonModule, NgChartsModule],
	exports: [StatisticsPage],
})
export class StatisticsModule {}
