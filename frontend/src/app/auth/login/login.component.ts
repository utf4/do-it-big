import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { AuthService } from "src/service/auth";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public error: string = "";

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  submit(): void {
    this.authService
      .login(
        this.form.controls["email"].value,
        this.form.controls["password"].value
      )
      .subscribe({
        next: (result) => {
          const obj = JSON.stringify(result.data);
          localStorage.setItem("user", obj);
          this.router.navigate(["/emails"]).catch((_error) => undefined);
        },
        error: (error) => {
          if (Array.isArray(error?.error?.message)) {
            this.error = error.error.message[0];
          } else {
            this.error = error.error.message;
          }
        },
      });
  }

  ngOnInit(): void {
    let user;
    user = localStorage.getItem("user");
    if (user) {
      this.router.navigate(["/emails"]).catch((_error) => undefined);
    }
  }
}
