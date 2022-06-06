import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-select-recharge-plan',
  templateUrl: './select-recharge-plan.page.html',
  styleUrls: ['./select-recharge-plan.page.scss'],
})
export class SelectRechargePlanPage implements OnInit {
  @Input() name: string = 'Arther Harrow';
  @Input() image: string = 'https://i.pravatar.cc/300';
  @Input() number: number = 256365214;
  @Input() operator: string = 'airtel';
  constructor() { }

  ngOnInit() {
  }

}
