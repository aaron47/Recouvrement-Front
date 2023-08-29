import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientCardComponent } from "./components/client-card/client-card.component";
import { ClientTableComponent } from "./components/client-table/client-table.component";

@NgModule({
	declarations: [ClientCardComponent, ClientTableComponent],
	exports: [ClientCardComponent, ClientTableComponent],
	imports: [CommonModule],
})
export class ClientsModule {}
