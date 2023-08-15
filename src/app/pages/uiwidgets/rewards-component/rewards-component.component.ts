import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-rewards-component',
  templateUrl: './rewards-component.component.html',
  styleUrls: ['./rewards-component.component.scss'],
})
export class RewardsComponentComponent implements OnInit {
  @Input() image:string = '../../assets/nayasa-reward.svg'
  @Input() offer:string = '₹400 off on NAAYASA jewellery';
  @Input() expire:string = ' will expire in   2 days';
  constructor() { }

  ngOnInit() {}

}
