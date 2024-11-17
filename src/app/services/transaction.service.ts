import { Injectable } from '@angular/core';
import { Analytics } from '@angular/fire/analytics';
import { doc, docData, Firestore, getDocs, where, query, orderBy, limit, updateDoc, increment, setDoc, docSnapshots } from '@angular/fire/firestore';
import { logEvent } from '@firebase/analytics';
import { addDoc, collection } from '@firebase/firestore';
import { DataProvider } from '../providers/data.provider';
import { Transaction } from '../structures/method.structure';
import { App } from '@capacitor/app';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private fs:Firestore,private dataProvider:DataProvider,private analytics:Analytics) { }
  
  async addTransaction(transactionDetail:Transaction){
    if (!(transactionDetail.ownerId || this.dataProvider.userData.access.access == 'admin')){
      alert("You are not a part of a group.");
      throw new Error("You are not a part of a group.");
    }
    try{
      var version = (await App.getInfo()).version
    } catch{
      var version  = "none"
    }
    logEvent(this.analytics,transactionDetail.type);
    console.log("TransactionService",transactionDetail)
    await setDoc(doc(this.fs,'counter/counter'),{totalTransactions:increment(1)},{merge:true})
    return addDoc(collection(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction'),{...transactionDetail,version:version})
  }

  getAllTransactions(){
    return getDocs(query(collection(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction'),orderBy('date','desc')))
  }

  getLimitedTransactions(length:number){
    return getDocs(query(collection(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction'),orderBy('date','desc'),limit(length)))
  }

  getTopTransactions(length:number){
    return getDocs(query(collection(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction'),orderBy('date','desc'),limit(length)))
  }

  getTransaction(transactionId:string){
    return docData(doc(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction/'+transactionId))
  }

  updateTransaction(transactionId:string,transactionDetail:any){
    return updateDoc(doc(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction/'+transactionId),transactionDetail)
  }

  getDTHPayments(){
    return getDocs(query(collection(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction'),where('type','==','cableDth')))
  }

  getTransactionListener(id:string){
    return docSnapshots(doc(this.fs,'users/'+this.dataProvider.userData.userId+'/transaction/'+id))
  }

}
