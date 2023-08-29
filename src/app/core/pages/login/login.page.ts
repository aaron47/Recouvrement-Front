import { Component, DestroyRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ToastrService } from "ngx-toastr";
import { of } from "rxjs";
import { AuthService } from "@services";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
})
export class LoginPage {
	loginForm: FormGroup;

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly authService: AuthService,
		private readonly router: Router,
		private readonly destroyRef: DestroyRef,
		private readonly toast: ToastrService,
	) {
		this.loginForm = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required, Validators.minLength(6)]],
		});
	}

	onSubmit(): void {
		if (this.loginForm.invalid) {
			return;
		}

		const loginRequest = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password,
		};

		this.authService
			.login$(loginRequest)
			.pipe(
				tap((res) => {
					const token = res.data?.["info"].token;
					localStorage.setItem("token", token);
					this.router.navigate(["home"]);
					this.toast.success("Connexion avec succès");
				}),
				catchError((err) => {
					this.toast.error("Erreur lors de la connexion");
					return of(false);
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe();
	}
}
