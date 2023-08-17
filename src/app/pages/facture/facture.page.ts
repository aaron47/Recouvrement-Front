import { Component, Input, OnInit } from "@angular/core";
import { Facture } from "../../utils/models/Facture";
import { BehaviorSubject, map, Observable, startWith } from "rxjs";
import { ResponseHelper } from "../../utils/models/ResponseHelper";
import { AppState } from "../../utils/app.state";
import { ApiService } from "../../services/api.service";
import { ActivatedRoute } from "@angular/router";
import { DataState } from "../../utils/enums/DataState";

@Component({
  selector: "app-facture-details",
  templateUrl: "./facture.page.html",
  styleUrls: ["./facture.page.css"],
})
export class FacturePage implements OnInit {
  factureState$!: Observable<AppState<ResponseHelper<Facture[]>>>;
  private dataSubject = new BehaviorSubject<ResponseHelper<Facture[]> | null>(null);

  constructor(
    private readonly apiService: ApiService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        const id = params["clientId"];

        this.factureState$ = this.apiService.facturesByClient$(id).pipe(
          map((response) => {
            this.dataSubject.next(response);

            return {
              dataState: DataState.LOADED,
              appData: response,
              errorMessage: response.message,
            };
          }),
          startWith({
            dataState: DataState.LOADING,
          }),
        );
      },
    );
  }

}
