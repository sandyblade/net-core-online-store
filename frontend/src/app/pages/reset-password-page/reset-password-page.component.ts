import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-password-page',
  standalone: false,
  templateUrl: './reset-password-page.component.html',
  styles: ``
})
export class ResetPasswordPageComponent {

  nowYear: number = new Date().getFullYear()
  showPassword: boolean = false
  showPasswordConfirm: boolean = false

  setShowPassword() {
    this.showPassword = !this.showPassword
  }

  setShowPasswordConfirm() {
    this.showPasswordConfirm = !this.showPasswordConfirm
  }

}
