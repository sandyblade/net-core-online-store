import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = '';
  loading:boolean = true
  connected:boolean = false

  loaderOptions: AnimationOptions = { path: '/animations/loader.json'};

  ngOnInit(): void {
    setTimeout(() => { 
      this.loading = false
      this.connected = true
    }, 3000)
  }


}
