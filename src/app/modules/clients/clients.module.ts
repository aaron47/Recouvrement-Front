import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientTableComponent } from "./components/client-table/client-table.component";

@NgModule({
	declarations: [ClientTableComponent],
	exports: [ClientTableComponent],
	imports: [CommonModule],
})
export class ClientsModule {}
