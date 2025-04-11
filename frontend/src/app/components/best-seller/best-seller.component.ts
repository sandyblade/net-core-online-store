import { Component } from '@angular/core';

@Component({
  selector: 'app-best-seller',
  standalone: false,
  templateUrl: './best-seller.component.html',
  styles: ``
})
export class BestSellerComponent {

  slides: Array<any> = [
    { img: "https://5an9y4lf0n50.github.io/demo-images/demo-commerce/product01.png" },
    { img: "https://5an9y4lf0n50.github.io/demo-images/demo-commerce/product02.png" },
    { img: "https://5an9y4lf0n50.github.io/demo-images/demo-commerce/product03.png" },
  ];

  slideConfig: any = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 2000
  };

}
