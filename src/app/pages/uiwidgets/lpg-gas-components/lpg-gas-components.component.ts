import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-lpg-gas-components',
  templateUrl: './lpg-gas-components.component.html',
  styleUrls: ['./lpg-gas-components.component.scss'],
})
export class LpgGasComponentsComponent implements OnInit {
  @Input() name:string = 'Indian Gas'
  @Input() image:string = '../../../assets/lpg-gas/indian.svg'
  constructor() { }

  ngOnInit() {}

}
