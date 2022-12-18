import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import { environment } from '../../environments/environment';
import { DataProvider } from '../providers/data.provider';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider,
    private databaseService: DatabaseService
  ) {}

  async getRequestOptions(extraData?: any, method?: string) {
    if (method == undefined || method === '') {
      method = 'POST';
    }
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    console.log('extraData', extraData);
    const userToken = await this.dataProvider.userInstance.getIdToken();
    let data = JSON.stringify({
      token: userToken,
      uid: this.dataProvider.userID,
      ...extraData,
    });
    console.log('request data', data);
    var requestOptions: RequestInit = {
      method: method,
      headers: myHeaders,
      body: data,
      redirect: 'follow',
    };
    console.log('requestOptions', requestOptions);
    return requestOptions;
  }

  async getAepsBanksList(): Promise<any> {
    console.log('getAepsBanksList', this.dataProvider.userInstance);
    try {
      const requestOptions = await this.getRequestOptions();
      const mainResponse = await fetch(
        environment.serverBaseUrl + '/aeps/bankList',
        requestOptions
      );
      console.log('REsponse', mainResponse);
      const result = mainResponse.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // wallet apis
  async getWalletBalance(): Promise<any> {
    console.log('getWalletBalance', this.dataProvider.userInstance);
    try {
      const requestOptions = await this.getRequestOptions();
      const mainResponse = await fetch(
        environment.serverBaseUrl + '/wallet/getBalance',
        requestOptions
      );
      console.log('REsponse', mainResponse);
      const result = mainResponse.json();
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async makeExpressPayout(transactionId: string) {
    this.dataProvider.pageSetting.blur = true;
    console.log('makeExpressPayout', this.dataProvider.userInstance);
    try {
      const requestOptions = await this.getRequestOptions({
        transactionId: transactionId,
      });
      console.log('requestOptions', requestOptions);
      const mainResponse = await fetch(
        environment.serverBaseUrl + '/payout/expressPayout',
        requestOptions
      );
      console.log('Response', mainResponse);
      this.dataProvider.pageSetting.blur = false;
      if (mainResponse.status == 200) {
        const result = mainResponse.json();
        console.log(result);
        return result;
      } else {
        throw mainResponse.statusText;
      }
    } catch (error) {
      this.dataProvider.pageSetting.blur = false;
      console.log(error);
      // throw error
    }
  }

  async getDthInfo(operator: string, customerId: string) {
    const requestOptions = await this.getRequestOptions({
      operator: operator,
      caNumber: customerId,
    });
    console.log('requestOptions', requestOptions);
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/hlr/getDthInfo',
      requestOptions
    );
    return mainResponse.json();
  }

  async recharge(transactionId: string) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    console.log('requestOptions', requestOptions);
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/recharge/doRecharge',
      requestOptions
    );
    return mainResponse.json();
  }

  async getMobileOperators() {
    const requestOptions = await this.getRequestOptions();
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/recharge/getOperatorsList',
      requestOptions
    );
    try {
      const data = await mainResponse.json();
      console.log('dat', data);
      if (data.data) {
        return data.data.filter((item) => {
          return item.category == 'Prepaid';
        });
      } else {
        this.alertify.presentToast(data.error);
        return [];
      }
    } catch (error) {
      this.alertify.presentToast("Can't fetch operators list");
      return [];
    }
  }

  async getMobilePlans(circle: string, operator: string) {
    const requestOptions = await this.getRequestOptions({
      circle: circle,
      operator: operator,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/hlr/getMobilePlan',
      requestOptions
    );
    const data = await mainResponse.json();
    return data;
  }

  async getCircleAndOperator(mobileNumber: any) {
    const requestOptions = await this.getRequestOptions({
      number: mobileNumber,
      type: 'mobile',
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/hlr/getCustomerInfo',
      requestOptions
    );
    const data = await mainResponse.json();
    return data;
  }

  async getDistOperatorList(): Promise<any[]> {
    const requestOptions = await this.getRequestOptions();
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/recharge/getOperatorsList',
      requestOptions
    );
    const data = await mainResponse.json();
    return data.data.filter((data) => {
      return data.category == 'DTH';
    });
  }

  async rechargeMobile(transactionId: string) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/recharge/doRecharge',
      requestOptions
    );
    const data = await mainResponse.json();
    return data;
  }

  async getLpgOperatorList() {
    const requestOptions = await this.getRequestOptions();
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/lpg/getLpgOperators',
      requestOptions
    );
    const data = await mainResponse.json();
    console.log('LPG OPERATORS', data);
    // return data
    if (data.response_code == 1) {
      return data.data.filter((data) => {
        return data.category == 'LPG';
      });
    } else {
      throw data;
    }
  }

  async getGasOperatorList() {
    const requestOptions = await this.getRequestOptions();
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/lpg/getLpgOperators',
      requestOptions
    );
    const data = await mainResponse.json();
    console.log('LPG OPERATORS', data);
    // return data
    if (data.response_code == 1) {
      return data.data.filter((data) => {
        return data.category == 'Gas';
      });
    } else {
      throw data;
    }
  }

  async fetchLpgGasBill(caNumber: string, operator: string) {
    const requestOptions = await this.getRequestOptions({
      customerNumber: caNumber,
      operatorNumber: operator,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/lpg/fetchLpgDetails',
      requestOptions
    );
    const data = await mainResponse.json();
    console.log('LPG BILL DETAILS', data);
    return data;
  }

  async payLpgGasBill(transactionId: string) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/lpg/lpgRecharge',
      requestOptions
    );
    const data = await mainResponse.json();
    console.log('LPG BILL PAYMENT', data);
    return data;
  }

  async getFastTagOperators() {
    const requestOptions = await this.getRequestOptions();
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/fastTag/getFastTagOperatorList',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Fast Tag data ', data);
      return data.data;
    } else {
      throw data;
    }
  }

  async fetchFastTagConsumerDetail(
    caNumber: string,
    operator: string | number
  ) {
    const requestOptions = await this.getRequestOptions({
      operator: operator,
      caNumber: caNumber,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/fastTag/fastTagDetails',
      requestOptions
    );
    const data = await mainResponse.json();
    console.log('Fast Tag data ', data);
    if (data.response_code == 1) {
      console.log('Fast Tag customer data ', data);
      return data;
    } else {
      throw data.message;
    }
  }

  async payFastTagBill(transactionId: string) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/fastTag/rechargeFastTag',
      requestOptions
    );
    const data = await mainResponse.json();
    console.log('Fast Tag data ', data);
    if (data.response_code == 1) {
      console.log('Fast Tag customer data ', data);
      return data;
    } else {
      throw data.message;
    }
  }

  async getBillPaymentOperators() {
    const requestOptions = await this.getRequestOptions();
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/billPayment/getBillOperators',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Bill Payment data ', data);
      return data;
    } else {
      throw data.message;
    }
  }

  async fetchBillPayment(operator: number, caNumber: number) {
    const requestOptions = await this.getRequestOptions({
      operator: operator,
      canumber: caNumber,
      mode: 'online',
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/billPayment/fetchBill',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Bill Payment data ', data);
      return data;
    } else {
      throw data.message;
    }
  }

  async payBillPayment(transactionId: string) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/billPayment/payBill',
      requestOptions
    );
    const data = await mainResponse.json();
    console.log('Bill Payment data 1 ', data);
    if (data.response_code == 1) {
      console.log('Bill Payment data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async getUtmLink() {
    const requestOptions = await this.getRequestOptions();
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/digitalAccount/getAccountReferralLink',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1 || data.response_code == 3) {
      console.log('Utm Link data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async fetchLicBill(userData: any) {
    const requestOptions = await this.getRequestOptions({
      caNumber: userData.caNumber,
      email: userData.email,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/lic/fetchLicBill',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Lic data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async payLicBill(transactionId: string) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/lic/payLicBill',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Lic data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async aepsGetBalanceEnquiry(transactionId) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/aeps/balanceEnquiry',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Aeps data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async aepsCashWithdrawal(transactionId) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/aeps/cashWithdrawal',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Aeps data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async aepsMiniStatement(transactionId) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/aeps/miniStatement',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Aeps data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async aepsAadhaarPay(transactionId) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/aeps/aadhaarPay',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Aeps data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async registerQr() {
    const requestOptions = await this.getRequestOptions({
      storeName: this.dataProvider.userData.displayName,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/qr/registerQr',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.response_code == 1) {
      console.log('Qr data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async createUpiPaymentQr(transactionId: string) {
    const requestOptions = await this.getRequestOptions({
      transactionId: transactionId,
    });
    console.log(requestOptions);
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/upi/createPayment',
      requestOptions
    );
    const data = await mainResponse.json();
    if (data.status) {
      console.log('Qr data ', data);
      return data;
    } else {
      throw data;
    }
  }

  async createNewUser(userData: any) {
    const requestOptions = await this.getRequestOptions({
      displayName: userData['displayName'],
      email: userData['email'],
      phoneNumber: userData['phoneNumber'],
      dob: userData['dob'],
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/sit-manager.appspot.com/o/users%2Fdefault%2Fuser.png?alt=media&token=f7502ba7-275f-40a8-92bd-7df725bc7786',
      gender: userData['gender'],
      access: userData['access'],
      state: userData['state'],
      city: userData['city'],
      pincode: userData['pincode'],
      address: userData['address'],
      aadhaarNumber: userData['aadhaarNumber'],
      panNumber: userData['panNumber'],
    });
    console.log('requestOptions', requestOptions);
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/admin/createUser',
      requestOptions
    );
    console.log('mainResponse', mainResponse);
    const data = await mainResponse.json();
    console.log('json response', data);
    if (data.response_code == 1) {
      console.log('Qr data ', data);
      this.databaseService.addOnboardingData(data);
      return data;
    } else {
      throw data;
    }
  }

  async onboardingForAepsKyc() {
    if (this.dataProvider.userData.kycStatus != 'approved') {
      return false;
    }
    const requestOptions = await this.getRequestOptions();
    try {
      var mainResponse = await fetch(
        environment.serverBaseUrl + '/onboarding/setup',
        requestOptions
      );
    } catch (error) {
      console.log('Error kyc 33', error.message);
      return;
    }
    // alert('Got response')
    const data = await mainResponse.json();
    // alert(data)
    console.log('Onboarding ', data, JSON.stringify(data));
    if (data.response_code == 1) {
      console.log('Qr data ', data);
      this.databaseService.addOnboardingData(data);
      return data;
    } else {
      // alert('A major error has occurred your kyc verification link generation has failed. Please immediately contact our support team.')
      throw data;
    }
  }

  async getAepsKycStatus() {
    if (this.dataProvider.userData.kycStatus != 'approved') {
      return false;
    }
    const requestOptions = await this.getRequestOptions({
      mobile: this.dataProvider.userData.phoneNumber,
      merchantcode: this.dataProvider.userData.userId,
    });
    const mainResponse = await fetch(
      environment.serverBaseUrl + '/onboarding/status',
      requestOptions
    );
    const data = await mainResponse.json();
    return data;
  }

  async recheckPaymentStatus(id: string) {
    const requestOptions = await this.getRequestOptions({ transactionId: id });
    return fetch(
      environment.serverBaseUrl + '/payment/recheckPaymentStatus',
      requestOptions
    );
  }
}
