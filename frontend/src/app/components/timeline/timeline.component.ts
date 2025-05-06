import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.component.html',
  styles: ``
})
export class TimelineComponent {

  @Input() rows: Array<any> = []

  dateFormat(input: any): string {
    return moment(input).format("DD-MM-YYYY HH:mm:ss")
  }

}
