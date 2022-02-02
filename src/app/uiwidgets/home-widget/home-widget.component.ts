import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-widget',
  templateUrl: './home-widget.component.html',
  styleUrls: ['./home-widget.component.scss'],
})
export class HomeWidgetComponent implements OnInit {
  @Input() name:string = 'AEPS';
  @Input() break:string = 'Services';
  @Input() pngname:string = 'group-1'
  constructor() { }

  ngOnInit() {}

}
