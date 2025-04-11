import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout-page',
  standalone: false,
  templateUrl: './checkout-page.component.html',
  styles: ``
})
export class CheckoutPageComponent {

  payment:number = -1
  accept:boolean = false

  setAccept(event:any){
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    this.accept = e.target.checked
  }

  setPayment(event:any, index:number){
    const e = event
    e.preventDefault();
    e.stopImmediatePropagation();
    this.payment = index
  }

}
