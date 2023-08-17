import { Component, OnInit } from "@angular/core";
import { ApiService } from "./services/api.service";
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
export class AppComponent {}
