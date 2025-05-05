import { Component, inject, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-page',
  standalone: false,
  templateUrl: './confirm-page.component.html',
  styles: ``
})
export class ConfirmPageComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute)
  nowYear: number = new Date().getFullYear()
  loading: boolean = true
  checkingOption: AnimationOptions = { path: '/animations/checking.json' };
  confirmedOption: AnimationOptions = { path: '/animations/confirmed.json' };
  errorResponse: string | null = null
  successResponse: string | null = null

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.params['token']
    this.authService.confirm(token)
      .subscribe({
        next: (response) => {
          setTimeout(() => {
            this.successResponse = response.message
            this.errorResponse = ''
            this.loading = false
          }, 2000)
        },
        error: (e) => {
          setTimeout(() => {
            this.loading = false
            this.errorResponse = e.error?.message
          }, 2000)
        }
      });
  }

}
