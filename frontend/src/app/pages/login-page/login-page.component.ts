import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styles: ``
})
export class LoginPageComponent implements OnInit {

  private readonly router = inject(Router);
  nowYear: number = new Date().getFullYear()
  showPassword: boolean = false
  loading: boolean = false
  errorResponse: string | null = null
  formGroup!: FormGroup;


  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  setShowPassword() {
    this.showPassword = !this.showPassword
  }

  ngOnInit(): void {

    const logged = localStorage.getItem('auth_token') !== undefined && localStorage.getItem('auth_token') !== null

    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      remember: new FormControl(''),
    });

    if (logged) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.errorResponse = ''
      this.loading = true
      this.authService.login(this.formGroup.value)
        .subscribe({
          next: (response) => {

            const auth_token = response.token
            const auth_user = {
              email: response.email,
              phone: response.phone,
              city: response.city,
              country: response.country,
            }

            if (localStorage.getItem('auth_token') === undefined || localStorage.getItem('auth_token') === null) {
              localStorage.setItem('auth_token', auth_token)
            }

            if (localStorage.getItem('auth_user') === undefined || localStorage.getItem('auth_user') === null) {
              localStorage.setItem('auth_user', JSON.stringify(auth_user))
            }

            setTimeout(() => {
              this.loading = false
              window.location.reload();
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
      this.formGroup.get('email')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('password')?.markAsTouched({ onlySelf: true })
    }

  }

  onClear() {
    this.formGroup.reset();
  }



}
