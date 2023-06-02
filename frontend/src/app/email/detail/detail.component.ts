import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EmailService } from "src/service/emails";
import { Emails } from "src/interfaces/emails";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"],
})
export class DetailComponent implements OnInit {
  form: FormGroup;
  private emailId: string;
  public showReply: Boolean = false;
  public email: Emails;
  public error: string = "";
  public success: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
    private fb: FormBuilder,
    private readonly router: Router
  ) {
    this.emailId = this.route.snapshot.params["id"];
    this.form = this.fb.group({
      body: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.emailService.email(this.emailId).subscribe({
      next: (result: any) => {
        this.email = result.data;
      },
      error: (error) => {
        if (Array.isArray(error?.error?.message)) {
          alert(error.error.message[0]);
        } else {
          alert(error.error.message);
        }
      },
    });
  }

  showReplySection(): void {
    this.showReply = true;
  }

  public submit() {
    this.emailService
      .reply(this.emailId, this.form.controls["body"].value)
      .subscribe({
        next: (result: any) => {
          this.email.emailReply = result?.data;
          this.success = true;
        },
        error: (error) => {
          if (Array.isArray(error?.message)) {
            this.error = error.error.message[0];
          } else {
            this.error = error.message;
          }
        },
      });
  }
}
