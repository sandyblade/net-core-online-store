import { Component } from '@angular/core';

@Component({
  selector: 'app-password-page',
  standalone: false,
  templateUrl: './password-page.component.html',
  styles: ``
})
export class PasswordPageComponent {

  nowYear: number = new Date().getFullYear()
  showPasswordCurrent: boolean = false
  showPassword: boolean = false
  showPasswordConfirm: boolean = false

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
