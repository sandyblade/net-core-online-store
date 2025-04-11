import { Component, inject, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {

  private modalService = inject(NgbModal);
  private readonly router = inject(Router);

  fliterSelected: number = 0
  filters: Array<string> = ["All Categories", "Laptop", "Accessories", "Camera", "Earphone"]

  setFilter(event: any, index: number) {
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    this.fliterSelected = index
  }

  showModal(event:any, content: TemplateRef<any>) {
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    this.modalService.open(content)
  }

  redirectTo(event:any, route:string){
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    setTimeout(() => {
      this.router.navigate([route]);
      this.modalService.dismissAll()
    })
  }

}
