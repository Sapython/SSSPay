import { Component, Input,OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  @Input() amount:string = '2,32,456.555';
  @Input() status:string = 'sent';
  @Input() user:string = 'mahesh'
  constructor() { }

  ngOnInit() {
  }

}
