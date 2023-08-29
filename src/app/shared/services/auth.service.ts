import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { Subject, tap } from "rxjs";
import { LoginRequest, LoginResponse, ResponseHelper } from "@models";
import { IS_AUTHENTICATED_URL, LOGIN_URL, LOGOUT_URL } from "@utils";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private readonly authenticated = new Subject<boolean>();
	public authenticated$ = this.authenticated.asObservable();

	constructor(
		private readonly http: HttpClient,
		private readonly toast: ToastrService,
		private readonly router: Router,
	) {}

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
		return this.http
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
					this.router.navigate(["login"]);
					this.toast.success("Déconnexion avec succès");
				}),
			);
	}
}
