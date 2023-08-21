import { Injectable } from "@angular/core";
import { LoginRequest } from "../utils/models/LoginRequest";
import { Subject, tap } from "rxjs";
import { LOGIN_URL } from "../utils/ApiUrls";
import { LoginResponse } from "../utils/models/LoginResponse";
import { ResponseHelper } from "../utils/models/ResponseHelper";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private readonly http: HttpClient) {}

	login$ = (loginRequest: LoginRequest) =>
		this.http.post<ResponseHelper<LoginResponse>>(LOGIN_URL, loginRequest);

	isAuthenticated()  {
		const token = localStorage.getItem("token");
		return !!token;
	}

	getToken(): string | null {
		if (!this.isAuthenticated()) {
			return null;
		}

		return localStorage.getItem("token");
	}
}
