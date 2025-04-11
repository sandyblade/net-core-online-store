import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-page',
  standalone: false,
  templateUrl: './cart-page.component.html',
  styles: ``
})
export class CartPageComponent implements OnInit {


  price:number = 980.00
  tabActive:number = 2
  qty:number = 1
  total:number = 0

  slides: Array<any> = [
    { img: "https://5an9y4lf0n50.github.io/demo-images/demo-commerce/product01.png" },
    { img: "https://5an9y4lf0n50.github.io/demo-images/demo-commerce/product02.png" },
    { img: "https://5an9y4lf0n50.github.io/demo-images/demo-commerce/product03.png" },
    { img: "https://5an9y4lf0n50.github.io/demo-images/demo-commerce/product04.png" }
  ];
  slideConfig: any = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 2000
  };

  handleTab(event:any, index:number) {
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    this.tabActive = index
  }

  ngOnInit(): void {
    this.total = this.price
  }

  setQty(event:any, type:string){
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    if (type === '+') {
       this.qty = this.qty + 1
       this.total = this.qty * this.price
    }else{
       if(this.qty > 1){
        this.qty = this.qty - 1
        this.total = this.qty * this.price
       }
    }
  } 

}
