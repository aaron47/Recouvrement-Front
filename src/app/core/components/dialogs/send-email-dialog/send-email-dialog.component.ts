import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject, first, switchMap, timer } from "rxjs";
import { Facture, SendEmailRequest } from "@models";
import { ApiService } from "@services";

@Component({
	selector: "app-send-email-dialog",
	templateUrl: "./send-email-dialog.component.html",
})
export class SendEmailDialogComponent {
	@Input({ required: true }) facture!: Facture;
	@Output() close = new EventEmitter<void>();

	sendEmailForm: FormGroup;

	private emailSentSuccessfully = new Subject<string>();
	emailSentSuccessfully$ = this.emailSentSuccessfully.asObservable();

	constructor(
		private readonly apiService: ApiService,
		private readonly formBuilder: FormBuilder,
	) {
		this.sendEmailForm = this.formBuilder.group({
			subject: ["", [Validators.required]],
			msgBody: ["", [Validators.required]],
		});
	}

	closeDialog(): void {
		this.close.emit();
	}

	onSubmit(): void {
		if (this.sendEmailForm.invalid) {
			return;
		}

		const sendEmailRequest: SendEmailRequest = {
			recipient: this.facture.client.email,
			subject: this.sendEmailForm.value.subject,
			msgBody: this.sendEmailForm.value.msgBody,
		};

		this.apiService
			.sendEmail$(sendEmailRequest)
			.pipe(
				first(),
				switchMap((res) => {
					this.emailSentSuccessfully.next(
						res.data?.["response"] as unknown as string,
					);
					return timer(2500);
				}),
			)
			.subscribe(() => {
				this.closeDialog();
			});
	}
}
