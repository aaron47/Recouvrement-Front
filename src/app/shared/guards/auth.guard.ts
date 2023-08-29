import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.isAuthenticated().pipe(
		switchMap((res) => {
			if (res.data?.["isAuthenticated"]) {
				return of(true);
			}

			return of(false);
		}),
		catchError((error) => {
			if (error.status === 403) {
				router.navigate(["/login"]);
			}
			return of(false);
		}),
	);
};
