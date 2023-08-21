import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
	ALL_CLIENTS_URL,
	ALL_FACTURES_BY_CLIENT_URL,
	ALL_FACTURES_URL,
	SEND_EMAIL_URL,
	SINGLE_CLIENT_URL,
	SINGLE_FACTURE_URL,
} from "../utils/ApiUrls";
import { Client } from "../utils/models/Client";
import { ResponseHelper } from "../utils/models/ResponseHelper";
import { Facture } from "../utils/models/Facture";
import { AuthService } from "./auth.service";
import { SendEmailRequest } from "../utils/models/SendEmailRequest";

@Injectable({
	providedIn: "root",
})
export class ApiService {
	constructor(
		private readonly http: HttpClient,
		private readonly authService: AuthService,
	) {}

	public clients$ = this.http.get<ResponseHelper<Client[]>>(ALL_CLIENTS_URL, {
		headers: {
			Authorization: `Bearer ${this.authService.getToken()}`,
		},
	});

	public client$ = this.http.get<ResponseHelper<Client>>(SINGLE_CLIENT_URL, {
		headers: {
			Authorization: `Bearer ${this.authService.getToken()}`,
		},
	});

	public factures$ = this.http.get<ResponseHelper<Facture[]>>(
		ALL_FACTURES_URL,
		{
			headers: {
				Authorization: `Bearer ${this.authService.getToken()}`,
			},
		},
	);

	public facturesByClient$ = (clientId: string) =>
		this.http.get<ResponseHelper<Facture[]>>(
			ALL_FACTURES_BY_CLIENT_URL + clientId,
			{
				headers: {
					Authorization: `Bearer ${this.authService.getToken()}`,
				},
			},
		);

	public facture$ = () =>
		this.http.get<ResponseHelper<Facture>>(SINGLE_FACTURE_URL + 1, {
			headers: {
				Authorization: `Bearer ${this.authService.getToken()}`,
			},
		});

	public sendEmail$ = (sendEmailRequest: SendEmailRequest) =>
		this.http.post<ResponseHelper<{ response: string }>>(
			SEND_EMAIL_URL,
			sendEmailRequest,
			{
				headers: {
					Authorization: `Bearer ${this.authService.getToken()}`,
				},
			},
		);
}
