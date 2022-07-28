import { Injectable } from '@angular/core';
import { Analytics } from '@angular/fire/analytics';
import { doc, docData, Firestore, getDocs, where, query } from '@angular/fire/firestore';
import { logEvent } from '@firebase/analytics';
import { addDoc, collection } from '@firebase/firestore';
import { DataProvider } from '../providers/data.provider';
import { Transaction } from '../structures/method.structure';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private fs:Firestore,private dataProvider:DataProvider,private analytics:Analytics) { }
  
  addTransaction(transactionDetail:Transaction){
    logEvent(this.analytics,transactionDetail.type);
    console.log("TransactionService",transactionDetail)
    return addDoc(collection(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction'),transactionDetail)
  }

  getAllTransactions(){
    return getDocs(collection(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction'))
  }

  getTransaction(transactionId:string){
    return docData(doc(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction/'+transactionId))
  }

  getDTHPayments(){
    return getDocs(query(collection(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction'),where('type','==','cableDth')))
  }
}
