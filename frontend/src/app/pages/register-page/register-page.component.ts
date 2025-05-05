import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent implements OnInit {

  private readonly router = inject(Router);
  nowYear: number = new Date().getFullYear()
  showPassword: boolean = false
  showPasswordConfirm: boolean = false
  loading: boolean = false
  errorResponse: string | null = null
  successResponse: string | null = null
  formGroup!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    const logged = localStorage.getItem('auth_token') !== undefined && localStorage.getItem('auth_token') !== null

    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(null, [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),
      passwordConfirm: new FormControl(null, [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ])
    },
      {
        validator: this.ConfirmedValidator('password', 'passwordConfirm'),
      });

    if (logged) {
      this.router.navigate(['/']);
    }
  }

  setShowPassword() {
    this.showPassword = !this.showPassword
  }

  setShowPasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.successResponse = ''
      this.errorResponse = ''
      this.loading = true
      this.authService.register(this.formGroup.value)
        .subscribe({
          next: (response) => {
            setTimeout(() => {
              this.successResponse = response.message
              this.loading = false
              this.formGroup.reset();
              setTimeout(() => {
                this.router.navigate([`/auth/register/confirm/${response.token}`]);
              }, 1500)
            }, 2000)
          },
          error: (e) => {
            setTimeout(() => {
              this.loading = false
              this.errorResponse = e.error?.message
            }, 2000)
          }
        });
    } else {
      this.successResponse = ''
      this.errorResponse = ''
      this.formGroup.get('name')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('email')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('password')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('passwordConfirm')?.markAsTouched({ onlySelf: true })
    }
  }

}
