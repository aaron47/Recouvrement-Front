import { Component, OnDestroy } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { takeUntil, tap } from "rxjs/operators";
import { Subject } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.page.html",
	styleUrls: ["./login.page.css"],
})
export class LoginPage implements OnDestroy {
	loginForm: FormGroup;
	private unsubscribe$: Subject<boolean> = new Subject();

	constructor(
		private readonly formBuilder: FormBuilder,
		private readonly authService: AuthService,
		private readonly router: Router,
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
				takeUntil(this.unsubscribe$),
				tap((res) => {
					const token = res.data?.["info"].token;
					localStorage.setItem("token", token);
					this.router.navigate(["home"]);
				}),
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
