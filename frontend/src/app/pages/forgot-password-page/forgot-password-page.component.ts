import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-forgot-password-page',
  standalone: false,
  templateUrl: './forgot-password-page.component.html',
  styles: ``
})
export class ForgotPasswordPageComponent implements OnInit {

  private readonly router = inject(Router);
  nowYear: number = new Date().getFullYear()
  loading: boolean = false
  errorResponse: string | null = null
  successResponse: string | null = null
  formGroup!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    const logged = localStorage.getItem('auth_token') !== undefined && localStorage.getItem('auth_token') !== null

    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    if (logged) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.successResponse = ''
      this.errorResponse = ''
      this.loading = true
      this.authService.forgot(this.formGroup.value)
        .subscribe({
          next: (response) => {
            setTimeout(() => {
              this.loading = false
              this.successResponse = response.message
              setTimeout(() => {
                this.router.navigate([`/auth/email/reset/${response.token}`]);
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
      this.formGroup.get('email')?.markAsTouched({ onlySelf: true })
      this.formGroup.get('password')?.markAsTouched({ onlySelf: true })
    }
  }

}
