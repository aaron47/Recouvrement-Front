import { Component, OnInit } from "@angular/core";
import { UserService } from "./services/user.service";
import { BehaviorSubject, catchError, map, Observable, of, startWith, tap } from "rxjs";
import { AppState } from "./utils/app.state";
import { ResponseHelper } from "./utils/models/ResponseHelper";
import { DataState } from "./utils/enums/DataState";
import { Facture } from "./utils/models/Facture";
import { Client } from "./utils/models/Client";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  factureState$!: Observable<AppState<ResponseHelper<Facture>>>;
  clientsState$!: Observable<AppState<ResponseHelper<Client[]>>>;
  private dataSubject = new BehaviorSubject<ResponseHelper<any> | null>(null);
  readonly DataState = DataState;

  constructor(
    private readonly userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.factureState$ = this.userService.$facture().pipe(
      map((response) => {
        this.dataSubject.next(response);

        return {
          dataState: this.DataState.LOADED,
          appData: response,
          errorMessage: "",
        };
      }),
      startWith({
        dataState: this.DataState.LOADING,
        errorMessage: "",
      }),
    );

    this.clientsState$ = this.userService.$clients.pipe(
      map((response) => {
        this.dataSubject.next(response);

        return {
          dataState: this.DataState.LOADED,
          appData: response,
          errorMessage: "",
        };

      }),
      startWith({
        dataState: this.DataState.LOADING,
        errorMessage: "",
      }),
    );
  }
}
