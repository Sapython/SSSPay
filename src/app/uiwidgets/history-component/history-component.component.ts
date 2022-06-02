import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-history-component',
  templateUrl: './history-component.component.html',
  styleUrls: ['./history-component.component.scss'],
})
export class HistoryComponentComponent implements OnInit {
  @Input() amount:string = '48,900'
  @Input() image:string = ""
  @Input() currency:string = '₹'
  @Input() sign:string = '+'
  @Input() time:string = '11.20 PM'
  @Input() date:string = '22 may 2022'
  @Input() purpose:string = 'For Beverages'
  @Input() name:string = 'Ranvijay Sinha'
  @Input() status:string = "success"
  constructor() { }

  ngOnInit() {}

}
