import { Component, Input,OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from 'src/app/structures/method.structure';
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  transactions:Transaction[] = []
  constructor(private transactionService:TransactionService) { }

  ngOnInit() {
    this.transactionService.getLimitedTransactions(20).then((docs)=>{
      this.transactions = []
      docs.forEach((doc:any)=>{
        this.transactions.push({...doc.data(),id:doc.id})
      })
    })
  }
  str(object:any){
    return JSON.stringify(object)
  }

  refresh($event){
    this.transactionService.getLimitedTransactions(20).then((docs)=>{
      this.transactions = []
      docs.forEach((doc:any)=>{
        this.transactions.push({...doc.data(),id:doc.id})
      })
      $event.target.complete()
    })
  }
}
