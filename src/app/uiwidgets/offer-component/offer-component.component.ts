import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-offer-component',
  templateUrl: './offer-component.component.html',
  styleUrls: ['./offer-component.component.scss'],
})
export class OfferComponentComponent implements OnInit {
  @Input() offer:string = "'Flat Rs.1000 off on order above Rs.5000'"
  @Input() image:string = "../../assets/nayasa-reward.svg";
  constructor() { }

  ngOnInit() {}

}
