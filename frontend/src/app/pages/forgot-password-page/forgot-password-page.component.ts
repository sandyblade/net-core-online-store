import { Component } from '@angular/core';

@Component({
  selector: 'app-forgot-password-page',
  standalone: false,
  templateUrl: './forgot-password-page.component.html',
  styles: ``
})
export class ForgotPasswordPageComponent {

  nowYear: number = new Date().getFullYear()

}
