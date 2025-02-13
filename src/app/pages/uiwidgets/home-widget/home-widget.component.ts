import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-widget',
  templateUrl: './home-widget.component.html',
  styleUrls: ['./home-widget.component.scss'],
})
export class HomeWidgetComponent implements OnInit {
  @Input() name:string = 'AEPS Services';
  @Input() break:string = 'Services';
  @Input() pngname:string = 'group-1';
  @Input() service:string = 'service';
  @Input() page:string = 'aeps'
  constructor() { }

  ngOnInit() {}

}
