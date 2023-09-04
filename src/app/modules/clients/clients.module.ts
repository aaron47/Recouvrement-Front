import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientTableComponent } from "./components/client-table/client-table.component";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
	declarations: [ClientTableComponent],
	exports: [ClientTableComponent],
	imports: [CommonModule, NgxPaginationModule],
})
export class ClientsModule {}
