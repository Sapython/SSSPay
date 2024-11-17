import { Component, OnInit } from '@angular/core';
import { doc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';
import { MemberManagementService } from 'src/app/services/member-management.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss'],
})
export class TransactionsPage implements OnInit {
  groupId: string;
  filterId:string = "";
  constructor(private activatedRoute:ActivatedRoute,public dataProvider:DataProvider,public memberService:MemberManagementService) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.groupId = params['groupId'];
    })
  }
  transactions:any[] = [];
  ngOnInit() {
    this.memberService.getTransactions(this.groupId).then((res)=>{
      this.transactions = res.docs.map((doc)=>{
        return {...doc.data(),transactionTime:doc.data().transactionTime.toDate()}
      });
      // sort by date
      this.transactions.sort((a,b)=>{
        return b.transactionTime.getTime() - a.transactionTime.getTime();
      })
      if (this.dataProvider.dataTwo && this.dataProvider.dataTwo.userId){
        this.filterId = this.dataProvider.dataTwo.userId;
        console.log("this.filterId",this.filterId);
        // filter by user id
        this.transactions = this.transactions.filter((transaction)=>{
          console.log(transaction.ownerId,this.filterId,transaction.ownerId == this.filterId);
          return transaction.ownerId == this.filterId;
        })
      }
      console.log("this.transactions",this.transactions);
    })
    
  }

}
