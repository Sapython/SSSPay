import { Component, OnInit } from '@angular/core';
import { ConfirmationResult, RecaptchaVerifier } from '@angular/fire/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.page.html',
  styleUrls: ['./phone-login.page.scss'],
})
export class PhoneLoginPage implements OnInit {
  showPassword = false;
  showCnfPwd = false;
  windowRef:any;
  showOtp: boolean = false;
  otp:string = '';
  constructor(
    public authService: AuthenticationService,
    public alertify: AlertsAndNotificationsService,
    public dataProvider: DataProvider,
    public userData:UserDataService
  ) {}
  phone: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
  ]);
  signInForm: FormGroup = new FormGroup({
    phone: this.phone,
  });
  otpRef:ConfirmationResult | undefined;
  ngOnInit() {
    this.windowRef = this.authService.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier('captcha',{
      size:'normal',
      callback:(response)=>{
        console.log(response);
      },
      'expired-callback':()=>{
        console.log("expired");
      }
    },this.authService.authInstance)
    this.windowRef.recaptchaVerifier.render();
  }
  confirmOtp(){
    if (this.otpRef) {
      this.otpRef.confirm(this.otp).then(async (res)=>{
        console.log(res);
        await this.userData.setUserData(res.user);
      }).catch((err)=>{
        this.alertify.presentToast(err.message,'error');
      })
    }
  }
  login(): void {
    console.log(this.signInForm,this.windowRef.recaptchaVerifier);
    if (this.signInForm.valid) {
      console.log(this.windowRef.recaptchaVerifier)
      this.authService.loginWithPhone(
        '+91'+this.phone.value.toString(),this.windowRef.recaptchaVerifier
      ).then((res:ConfirmationResult)=>{
        this.showOtp = true;
        // res.confirm()
        this.otpRef = res;
      });
    } else {
      this.alertify.presentToast(
        'Please fill all the fields correctly',
        'error',
        3000
      );
    }
  }
  togglePassword(type) {
    if (type === 'p') {
      this.showPassword = !this.showPassword;
    } else if (type === 'c') {
      this.showCnfPwd = !this.showCnfPwd;
    }
  }
}
