import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bank-list-modal',
  templateUrl: './bank-list-modal.component.html',
  styleUrls: ['./bank-list-modal.component.scss'],
})
export class BankListModalComponent implements OnInit {
  @Input() banks:any[]= [];
  constructor() { }

  ngOnInit() {}
  submit(bank:any){
    console.log(bank);
  }
}
