import { Injectable } from "@angular/core";
import { LoginRequest } from "../utils/models/LoginRequest";
import { Subject, tap } from "rxjs";
import { IS_AUTHENTICATED_URL, LOGIN_URL, LOGOUT_URL } from "../utils/ApiUrls";
import { LoginResponse } from "../utils/models/LoginResponse";
import { ResponseHelper } from "../utils/models/ResponseHelper";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private readonly authenticated = new Subject<boolean>();
	public authenticated$ = this.authenticated.asObservable();

	constructor(private readonly http: HttpClient) {}

	login$ = (loginRequest: LoginRequest) =>
		this.http.post<ResponseHelper<LoginResponse>>(LOGIN_URL, loginRequest);

	isAuthenticated() {
		return this.http
			.get<ResponseHelper<{ isAuthenticated: boolean }>>(IS_AUTHENTICATED_URL, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.pipe(tap(() => this.authenticated.next(true)));
	}

	getToken(): string | null {
		return localStorage.getItem("token");
	}

	logout() {
		this.http
			.post(
				LOGOUT_URL,
				{},
				{
					headers: {
						Authorization: `Bearer ${this.getToken()}`,
					},
				},
			)
			.pipe(
				tap(() => {
					localStorage.clear();
					this.authenticated.next(false);
					window.location.reload();
				}),
			);
	}
}
