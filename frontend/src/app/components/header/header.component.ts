import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {


  private modalService = inject(NgbModal);
  private readonly router = inject(Router);
  logged: boolean = false
  user: any = {}

  fliterSelected: number = 0
  filters: Array<string> = ["All Categories", "Laptop", "Accessories", "Camera", "Earphone"]

  ngOnInit(): void {
    this.logged = localStorage.getItem('auth_token') !== undefined && localStorage.getItem('auth_token') !== null

    if (localStorage.getItem('auth_user') !== undefined && localStorage.getItem('auth_user') !== null) {
      this.user = JSON.parse(localStorage.getItem('auth_user') || '{}')
    }

  }

  setFilter(event: any, index: number) {
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    this.fliterSelected = index
  }

  showModal(event: any, content: TemplateRef<any>) {
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    this.modalService.open(content)
  }

  redirectTo(event: any, route: string) {
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    setTimeout(() => {
      this.router.navigate([route]);
      this.modalService.dismissAll()
    })
  }

  logout(event: any) {
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();

    if (localStorage.getItem('auth_user') !== undefined && localStorage.getItem('auth_user') !== null) {
      localStorage.removeItem('auth_user')
    }

    if (localStorage.getItem('auth_token') !== undefined && localStorage.getItem('auth_token') !== null) {
      localStorage.removeItem('auth_token')
    }

    setTimeout(() => {
      window.location.reload()
    })

  }

}
