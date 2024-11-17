import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recharge-plan',
  templateUrl: './recharge-plan.component.html',
  styleUrls: ['./recharge-plan.component.scss'],
})
export class RechargePlanComponent implements OnInit {

  @Input() amount:number = 3359;
  @Input() validity:number = 365 ;
  @Input() data:number = 3;
  @Input() calls:string = 'Unliimited' ;
  constructor() { }

  ngOnInit() {}

}
