import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { environment } from '../../environments/environment';
import { DataProvider } from '../providers/data.provider';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(
    private authService: AuthenticationService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider
  ) {}

  async getRequestOptions(extraData?:any,method?:string,){
    if (method==undefined || method === ''){
      method = 'POST'
    }
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const userToken = await this.dataProvider.userInstance.getIdToken()
    let data = JSON.stringify({
      token: userToken,
      uid: this.dataProvider.userID,
      ...extraData
    });
    var requestOptions: RequestInit = {
      method: method,
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    };
    console.log("requestOptions",requestOptions)
    return requestOptions
  }

  async getAepsBanksList():Promise<any>{
    console.log('getAepsBanksList',this.dataProvider.userInstance);
    try {
      const requestOptions = await this.getRequestOptions();
      const mainResponse = await fetch(environment.serverBaseUrl + '/aeps/bankList', requestOptions)
      console.log("REsponse",mainResponse)
      const result = mainResponse.json() 
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  // wallet apis
  async getWalletBalance():Promise<any>{
    console.log('getWalletBalance',this.dataProvider.userInstance);
    try {
      const requestOptions = await this.getRequestOptions();
      const mainResponse = await fetch(environment.serverBaseUrl + '/wallet/getBalance', requestOptions)
      console.log("REsponse",mainResponse)
      const result = mainResponse.json() 
      console.log(result)
      return result
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async makeExpressPayout(transactionId:string){
    this.dataProvider.pageSetting.blur = true;
    console.log('makeExpressPayout',this.dataProvider.userInstance);
    try {
      const requestOptions = await this.getRequestOptions(
        {
          transactionId:transactionId
        }
      );
      console.log("requestOptions",requestOptions)
      const mainResponse = await fetch(environment.serverBaseUrl + '/payout/expressPayout', requestOptions)
      console.log("Response",mainResponse)
      this.dataProvider.pageSetting.blur = false;
      if (mainResponse.status == 200){
        const result = mainResponse.json() 
        console.log(result)
        return result 
      } else {
        throw mainResponse.statusText
      }
    } catch (error) {
      this.dataProvider.pageSetting.blur = false;
      console.log(error)
      // throw error
    }
  }

  async getDthInfo(operator:string,customerId:string){
    const requestOptions = await this.getRequestOptions(
      {
        operator:operator,
        caNumber:customerId
      }
    );
    console.log("requestOptions",requestOptions)
    const mainResponse = await fetch(environment.serverBaseUrl + '/hlr/getDthInfo', requestOptions)
    return mainResponse.json()
  }

  async recharge(transactionId:string){
    const requestOptions = await this.getRequestOptions(
      {
        transactionId:transactionId
      }
    );
    console.log("requestOptions",requestOptions)
    const mainResponse = await fetch(environment.serverBaseUrl + '/recharge/doRecharge', requestOptions)
    return mainResponse.json()
  }

  async getMobileOperators(){
    const requestOptions =  await this.getRequestOptions();
    const mainResponse = await fetch(environment.serverBaseUrl + '/recharge/getOperatorsList',requestOptions)
    const data = await mainResponse.json()
    return data.data.filter((item)=>{return item.category=='Prepaid'});
  }

  async getMobilePlans(circle:string,operator:string){
    const requestOptions =  await this.getRequestOptions(
      {
        "circle":circle,
        "operator":operator,
      }
    );
    const mainResponse = await fetch(environment.serverBaseUrl + '/hlr/getMobilePlan',requestOptions)
    const data = await mainResponse.json()
    return data;
  }

  async getCircleAndOperator(event:any){
    const requestOptions =  await this.getRequestOptions({number:event.detail.value,type:'mobile'});
    const mainResponse = await fetch(environment.serverBaseUrl + '/hlr/getCustomerInfo',requestOptions)
    const data = await mainResponse.json()
    return data;
  }
  async getDistOperatorList():Promise<any[]>{
    const requestOptions =  await this.getRequestOptions();
    const mainResponse = await fetch(environment.serverBaseUrl + '/recharge/getOperatorsList',requestOptions)
    const data = await mainResponse.json()
    return data.data.filter((data)=>{return data.category=='DTH'});
  }

  async rechargeMobile(transactionId:string){
    const requestOptions =  await this.getRequestOptions({transactionId:transactionId});
    const mainResponse = await fetch(environment.serverBaseUrl + '/recharge/doRecharge',requestOptions)
    const data = await mainResponse.json()
    return data;
  }
}
