import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {

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
