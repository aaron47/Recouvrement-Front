import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	Output,
} from "@angular/core";
import { Facture } from "../../../utils/models/Facture";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/services/api.service";
import { SendEmailRequest } from "src/app/utils/models/SendEmailRequest";
import { Subject, delay, switchMap, takeUntil, tap, timer } from "rxjs";

@Component({
	selector: "app-send-email-dialog",
	templateUrl: "./send-email-dialog.component.html",
	styleUrls: ["./send-email-dialog.component.css"],
})
export class SendEmailDialogComponent implements OnDestroy {
	@Input({ required: true }) facture!: Facture;
	@Output() close = new EventEmitter<void>();
	private unsubscribe$: Subject<boolean> = new Subject();
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
				takeUntil(this.unsubscribe$),
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

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}
}
