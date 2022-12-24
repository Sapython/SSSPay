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
      console.log("this.transactions",this.transactions);
    })
    
  }

}
