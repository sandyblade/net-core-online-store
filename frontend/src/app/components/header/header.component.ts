import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  fliterSelected: number = 0
  filters: Array<string> = ["All Categories", "Laptop", "Accessories", "Camera", "Earphone"]

  setFilter(event: any, index: number) {
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    this.fliterSelected = index
  }

}
