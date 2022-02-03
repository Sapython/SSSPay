import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-widget',
  templateUrl: './contacts-widget.component.html',
  styleUrls: ['./contacts-widget.component.scss'],
})
export class ContactsWidgetComponent implements OnInit {
  @Input() name:string = 'Kumar Saptam'
  constructor() { }

  ngOnInit() {}

}
