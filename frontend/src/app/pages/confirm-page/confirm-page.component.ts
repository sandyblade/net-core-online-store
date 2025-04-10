import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-confirm-page',
  standalone: false,
  templateUrl: './confirm-page.component.html',
  styles: ``
})
export class ConfirmPageComponent implements OnInit {

  nowYear: number = new Date().getFullYear()
  loading: boolean = true
  checkingOption: AnimationOptions = { path: '/animations/checking.json' };
  confirmedOption: AnimationOptions = { path: '/animations/confirmed.json' };

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false
    }, 3000)
  }

}
