import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-password-page',
  standalone: false,
  templateUrl: './password-page.component.html',
  styles: ``
})
export class PasswordPageComponent implements OnInit {

  private readonly router = inject(Router);
  nowYear: number = new Date().getFullYear()
  showPasswordCurrent: boolean = false
  showPassword: boolean = false
  showPasswordConfirm: boolean = false
  loading: boolean = false
  errorResponse: string | null = null
  successResponse: string | null = null
  formGroup!: FormGroup;

  constructor(private profileService: ProfileService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    const logged = localStorage.getItem('auth_token') !== undefined && localStorage.getItem('auth_token') !== null

    this.formGroup = this.formBuilder.group({
      currentPassword: new FormControl(null, [
        (c: AbstractControl) => Validators.required(c),
        Validators.pattern(
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
        ),
      ]),
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


    if (!logged) {
      this.router.navigate(['/auth/login']);
    }
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
      this.profileService.password(this.formGroup.value)
        .subscribe({
          next: (response) => {
            setTimeout(() => {
              this.successResponse = response.message
              this.loading = false
              this.formGroup.reset();
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
      this.formGroup.get('currentPassword')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('password')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('passwordConfirm')?.markAsTouched({ onlySelf: true })
    }
  }

  setShowPassword() {
    this.showPassword = !this.showPassword
  }

  setShowPasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm
  }

  setShowPasswordCurrent() {
    this.showPasswordCurrent = !this.showPasswordCurrent
  }

}
