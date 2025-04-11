import { Component, OnInit } from '@angular/core';
import { Options, LabelType } from "@angular-slider/ngx-slider";

@Component({
  selector: 'app-store-page',
  standalone: false,
  templateUrl: './store-page.component.html',
  styles: ``
})
export class StorePageComponent implements OnInit {


  totalProduct:number = 9
  minValue: number = 100;
  maxValue: number = 500;
  images:Array<String> = []

  ngOnInit(): void {
    let _images:Array<string> = []
    for(let i = 1; i <= this.totalProduct; i++){
       let img = `https://5an9y4lf0n50.github.io/demo-images/demo-commerce/product${this.getCode(i)}.png`
       _images.push(img)
    }
    this.images = _images
  }

  options: Options = {
    floor: 0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return "<b>Min price:</b> $" + value;
        case LabelType.High:
          return "<b>Max price:</b> $" + value;
        default:
          return "$" + value;
      }
    }
  };

  getCode(num:number): string{
    return (num).toString().padStart(2,"0")
  }

}
