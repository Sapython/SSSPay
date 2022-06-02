import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-bank-widget',
  templateUrl: './bank-widget.component.html',
  styleUrls: ['./bank-widget.component.scss'],
})
export class BankWidgetComponent implements OnInit {
  @Input() name:string = 'Axis Bank Fastag'
  @Input() image:string = "../../../assets/banks/axisbank.svg";
  constructor() { }

  ngOnInit() {}

}
