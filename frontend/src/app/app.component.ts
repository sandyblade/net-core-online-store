import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2, HostListener } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = '';
  loading: boolean = true
  connected: boolean = false
  backTo: boolean = false

  private document: any

  animationOption: AnimationOptions = { path: '/animations/loader.json' };

  constructor(@Inject(DOCUMENT) document: any, private render: Renderer2) {
    this.document = document
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false
      this.connected = true
    }, 3000)
  }

  clickToTop(event: any) {
    const e = event
    const window = this.document?.defaultView
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    e.stopImmediatePropagation();
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event: any) {
    this.backTo = this.document.body.scrollTop > 50 || this.document.documentElement.scrollTop > 50 ? true : false
  }


}
