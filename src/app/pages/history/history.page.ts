import { Component, Input,OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { Transaction } from 'src/app/structures/method.structure';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  transactions:ExtendedTransaction[] = []
  constructor(public dataProvider:DataProvider,private databaseService:DatabaseService) { }

  ngOnInit() {
    this.databaseService.getFirstTransactions().then((query)=>{
      this.transactions = query.docs.map((doc)=>{return {...doc.data(),id:doc.id,doc:doc} as ExtendedTransaction});
    })
  }

  doRefresh(event:any){
    this.databaseService.getSomeTransactions(this.transactions.length).then((query)=>{
      this.transactions = query.docs.map((doc)=>{return {...doc.data(),id:doc.id,doc:doc} as ExtendedTransaction});
      event.target.complete();
    })
  }

  loadData(event:any){
    console.log("load data",event);
    this.databaseService.getNextTransactions(this.transactions[this.transactions.length-1].doc).then((query)=>{
      console.log("got next transactions",query);
      let newTransactions = query.docs.map((doc)=>{return {...doc.data(),id:doc.id,doc:doc} as ExtendedTransaction});
      this.transactions = [...this.transactions,...newTransactions];
      event.target.complete();
    })
  }


  str(object:any){
    return JSON.stringify(object)
  }

}
interface ExtendedTransaction extends Transaction{
  doc:any;
}