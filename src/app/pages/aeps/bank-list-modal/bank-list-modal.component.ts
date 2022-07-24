import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-bank-list-modal',
  templateUrl: './bank-list-modal.component.html',
  styleUrls: ['./bank-list-modal.component.scss'],
})
export class BankListModalComponent implements OnInit {
  @Input() banks:any[]= [];
  banksPart:any[]=[];
  constructor(private modalController:ModalController) { }
  filteredBanks:any[]=[];
  ngOnInit() {
    this.banksPart = this.banks.slice(0, 20);
  }
  submit(bank:any){
    console.log(bank);
  }
  search(event:any){
    // console.log(event.target.value);
    const options = { keys: ['name'] };
    const fuse = new Fuse(this.banks, options);
    this.filteredBanks = []
    const results = fuse.search(event.target.value);
    results.forEach(element => {
      this.filteredBanks.push(element.item);
    });
  }
  closeModal(){
    this.modalController.dismiss();
  }
  loadData(event:any){
    console.log(event);
    this.banksPart.push(...this.banks.slice(this.banksPart.length, this.banksPart.length+20))
    if (this.banksPart.length == this.banks.length){
      event.target.disabled = true;
    }
    event.target.complete();
  }
}
