import { CommonModule, Location } from "@angular/common";
import { Component, inject, Inject, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { loginSuccessMessage, registerTemplate } from "../../models/templates";
import { AuthServiceService } from "../../services/auth-service/auth-service.service";

@Component({
  selector: "app-sign-up",
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: "./sign-up.component.html",
  styleUrl: "./sign-up.component.scss",
})
export class SignUpComponent {
  type: string = "password";
  loading: boolean = false;
  registrationErrorMessage: string = "";

  // inject the authentication service
  private auth = inject(AuthServiceService);
  private router = inject(Router);
  private location = inject(Location); 

  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
    },
    {
      validators: this.confirmPasswordValidator(),
    }
  );

  // the password validator function
  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control instanceof FormGroup) {
        const password = control.get("password")?.value;
        const confirmPassword = control.get("confirmPassword")?.value;
        // checking if the two of the passwords match
        return password && confirmPassword && password !== confirmPassword
          ? { mismatch: true }
          : null;
      }
      return null;
    };
  }

  // getting the controls of this form
  get Fields() {
    return this.registerForm.controls;
  }

  // toggle the type of input for password
  togglePassword() {
    if (this.type === "password") {
      this.type = "text";
    } else {
      this.type = "password";
    }
  }

  handleGoBack() {
    this.location.back();
  }

  submitRegisterForm() {
    this.loading = true;
    const body = this.registerForm.value;
    delete body.confirmPassword;
    body.role = "customer";
    // make the api call
    this.auth.postRegistrationDetails(body).subscribe(
      (res) => {
        localStorage.setItem("userEmail", body.email);
        localStorage.setItem("type", "verify-email");
        this.router.navigateByUrl("/pin-verification");
      },
      (error) => {
        this.registrationErrorMessage = error.error.error;
        console.log(error);
        this.loading = false;
      }
    );
  }
}
