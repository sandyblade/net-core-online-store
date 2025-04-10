import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {

  nowYear: number = new Date().getFullYear()
  author: string = "Sandy Andryanto"

}
