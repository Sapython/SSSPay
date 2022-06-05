import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collectionData,
  DocumentReference,
  collectionSnapshots,
  CollectionReference,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  docSnapshots,
  docData,
  getDoc,
  getDocs,
  where,
} from '@angular/fire/firestore';
import { FieldValue, increment, query } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { DataProvider } from '../providers/data.provider';
import { ContactRequest } from '../structures/user.structure';
import { AuthencationService } from './authencation.service';
import { Analytics, logEvent,setCurrentScreen, setUserProperties, setUserId } from '@angular/fire/analytics';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { editableFields } from '../main/account-page/account-page.page';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  NON_ADMINS = ['user','guest','worker'];
  contactDoc: CollectionReference;
  constructor(private fs: Firestore, private dataProvider: DataProvider,private analytics:Analytics,private alertify:AlertsAndNotificationsService) {
    this.contactDoc = collection(this.fs, 'contactRequests');
    getDocs(collection(this.fs, 'stocks')).then((data:any) => {
      let sits = []
      data.forEach((stock:any) => {
        sits.push(stock.data())
        if (stock.data().views==undefined || stock.data().views == null){
          setDoc(doc(this.fs, 'stocks/' + stock.id), {views:0},{merge:true});
          // alert('Called set document')
        }
      })
      dataProvider.sits = sits;
    })
  }
  storage = getStorage();
  checkAdmin() {
    if(this.dataProvider.userData?.access.access !== 'admin'){
      this.alertify.presentToast('You are not an admin', 'error', 2000);
      return
    }
  }
  addContactRequest(
    name: string,
    email: string,
    phoneNumber: string,
    message: string
  ) {
    let data: ContactRequest = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      message: message,
      date: new Date(),
    };
    addDoc(this.contactDoc, data).then((doc) => {
      console.log(doc);
      console.log(doc.id);
    });
  }
  logBug(description) {
    logEvent(this.analytics, 'bug', { description: description });
    let date = new Date().toDateString();
    let data = {
      date: date || '',
      message: description || '',
      url: window.location.href || '',
      clientInfo: window.navigator.userAgent || '',
      user: this.dataProvider.userData || '',
      logs: this.dataProvider.logs || '',
      screenWidth: screen.width || '',
      screenHeight: screen.height || '',
      windowWidth: window.innerWidth || '',
      windowHeight: window.innerHeight || '',
      availWidth: screen.availWidth || '',
      availHeight: screen.availHeight || '',
      colorDepth: screen.colorDepth || '',
      pixelDepth: screen.pixelDepth || '',
      referrer: document.referrer || '',
      historyLength: history.length || '',
      title: document.title || '',
      browserName: window.navigator.userAgent || '',
      userLanguage: navigator.language || '',
      userAgent: navigator.userAgent || '',
      cookieEnabled: navigator.cookieEnabled || '',
      onLine: navigator.onLine || '',
      hardwareConcurrency: navigator.hardwareConcurrency || '',
      maxTouchPoints: navigator.maxTouchPoints || '',
      doNotTrack: navigator.doNotTrack || '',
      solved: false,
    };
    return addDoc(collection(this.fs, 'logs'), data);
  }
  markAttendance(uid:string){
    logEvent(this.analytics,'Mark_attendance');
    return updateDoc(doc(this.fs, 'users/'+uid),{attendanceCount:increment(1),attendanceDate:new Date()});
  }
  changeAccess(access:string,uid:string){
    logEvent(this.analytics,'Access_Changed',{access:access});
    updateDoc(doc(this.fs, 'users/'+uid),{access:{access:access}})
  }
  addSit(data:any){
    return addDoc(collection(this.fs, 'stocks'), data);
  }
  addPositionLog(data:any){
    return setDoc(doc(this.fs, 'posLogs/'+(new Date()).toDateString()), data);
  }
  addLog(data:any){
    return addDoc(collection(this.fs, 'logs'), data);
  }
  // SIt services starts
  getSitLedgers() {
    logEvent(this.analytics,'Get_all_data');
    return collectionSnapshots(collection(this.fs, 'stocks'));
  }
  getAllSit(){
    logEvent(this.analytics,'Get_all_data');
    return getDocs(collection(this.fs, 'stocks'));
  }
  getWorkers() {
    logEvent(this.analytics,'Get_all_worker');
    return getDocs(query(collection(this.fs, 'users'),where('access.access', '==', 'worker')));
  }
  getEmployees() {
    logEvent(this.analytics,'Get_all_employees');
    return getDocs(query(collection(this.fs, 'users'),where('access.access', 'in', ['worker','supervisor'])));
  }
  getEmployeesSubscription() {
    logEvent(this.analytics,'Get_all_employees');
    return collectionSnapshots(query(collection(this.fs, 'users'),where('access.access', 'in', ['worker','supervisor','admin'])));
  }
  getSupervisor() {
    logEvent(this.analytics,'Get_all_supervisor');
    return getDocs(query(collection(this.fs, 'users'),where('access.access', '==', 'supervisor')));
  }
  async unloadSit(sitId,data) {
    if (this.NON_ADMINS.includes(this.dataProvider.userData?.access.access)) {
      this.alertify.presentToast('You are not an admin', 'error', 2000);
      return
    }
    logEvent(this.analytics,'Unloaded_Sit',{sitId:sitId});
    await updateDoc(doc(this.fs, 'stocks/'+sitId),{status:'unloaded'})
    return setDoc(doc(this.fs, 'stocks/'+sitId+'/unloaded/unloaded'), data);
  }
  async recieveSit(sitId,data) {
    if (this.NON_ADMINS.includes(this.dataProvider.userData?.access.access)) {
      this.alertify.presentToast('You are not an admin', 'error', 2000);
      return
    }
    logEvent(this.analytics,'Received_Sit',{sitId:sitId});
    await updateDoc(doc(this.fs, 'stocks/'+sitId),{status:'received',views:increment(2)})
    return setDoc(doc(this.fs, 'stocks/'+sitId+'/received/received'), data);
  }
  getSit(id:string){
    logEvent(this.analytics,'Get_STOCK',{sitId:id});
    return getDoc(doc(this.fs, 'stocks/'+id));
  }
  getReceivedSit(id: string){
    logEvent(this.analytics,'Get_STOCK',{sitId:id});
    updateDoc(doc(this.fs, 'stocks/'+id),{views:increment(1)})
    return getDoc(doc(this.fs, 'stocks/'+id+'/received/received'));
  }
  getUnloadedSit(id:string){
    logEvent(this.analytics,'Get_STOCK',{sitId:id});
    updateDoc(doc(this.fs, 'stocks/'+id),{views:increment(1)})
    return getDoc(doc(this.fs, 'stocks/'+id+'/unloaded/unloaded'));
  }
  deleteUserByUid(uid:string){
    logEvent(this.analytics,'User_Deleted',{userId:uid});
    updateDoc(doc(this.fs, 'users/'+uid),{status:'deleted'})
  }
  saveUserData(name:string,email:string,phoneNumber:string,uid){
    logEvent(this.analytics,'Saved_New_User_Data',{userId:uid});
    updateDoc(doc(this.fs, 'users/'+uid),{name:name,email:email,phoneNumber:phoneNumber})
  }
  updateUserImage(url:string,uid:string){
    logEvent(this.analytics,'Updated_User_Image',{userId:uid});
    return updateDoc(doc(this.fs, 'users/'+uid),{photoURL:url})
  }
  updateUserData(data:editableFields,uid){
    logEvent(this.analytics,'Updated_User_Data',{userId:uid});
    // for (const key in data) {
    //   if (Object.prototype.hasOwnProperty.call(data, key)) {
    //     const element = data[key];
    //     this.setSpecificUserData(key,element,uid).then(()=>{
    //       console.log('updated',key,element);
    //     });
    //   }
    // }
    return updateDoc(doc(this.fs, 'users/'+uid),data);
  }
  // SIT services ends
  // User services starts
  getUser(id: string) {
    logEvent(this.analytics,'Get_User',{userId:id});
    return getDoc(doc(this.fs, 'users/' + id));
  }
  // User services ends
  // Files services starts
  async upload(path: string, file: File | ArrayBuffer | Blob | Uint8Array): Promise<any> {
    // const ext = file!.name.split('.').pop();
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        await task;
        const url = await getDownloadURL(storageRef);
        return url;
      } catch (e: any) {
        console.error(e);
        return e;
      }
    } else {
      // handle invalid file
      return false;
    }
  }
  // Files services ends
  // Testing services starts
  uploadVehicle(data) {
    return addDoc(collection(this.fs, 'plateData'), data);
  }
  setUserData(field:string,value:any){
    return updateDoc(doc(this.fs, 'users/'+this.dataProvider.userData?.userId),{[field]:value})
  }
  setSpecificUserData(field:string,value:any,uid:string){
    return updateDoc(doc(this.fs, 'users/'+uid),{[field]:value})
  }
}
