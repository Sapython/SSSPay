import { Component, Input,OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { Transaction } from 'src/app/structures/method.structure';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  transactions:Transaction[] = []
  constructor(public dataProvider:DataProvider) { }

  ngOnInit() {
    
  }
  str(object:any){
    return JSON.stringify(object)
  }

}
