import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ServerService } from 'src/app/services/server.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { ModalPageComponent } from '../uiwidgets/modal-page/modal-page.component';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  userId:string;
  emailValue;
  constructor(  
    public modalController: ModalController,
    public authService:AuthenticationService,
    public dataProvider:DataProvider,
    public serverService:ServerService,
    private router:Router,
    private alertify:AlertsAndNotificationsService
  ) { }
  step:"one"|"two"|"three"|"four" = "one";
  currentOtp="";
  emailOrPhone = "";
  password:string = "";
  confirmPassword:string = "";
  ngOnInit() {
  }

  submit(){
    // check if emailOrPhone is email or phone
    if(RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$').test(this.emailOrPhone)){
      console.log("This is an email")
      this.dataProvider.pageSetting.blur = true;
      this.verifyDetail(null,this.emailOrPhone).then((res:any)=>{
        // this.userId = res.userId;
        console.log(res)
        this.userId = res.userId;
        this.sendResetEmailLink(this.emailOrPhone);
        this.alertify.presentToast("Please check your email for reset password link.")
        this.emailValue = this.emailOrPhone;
        this.router.navigate(['/login'])
        this.step = "one";
      }).catch((err:any)=>{
        this.alertify.presentToast(err.error)
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      })
    }else if (RegExp('^[0-9]{10}$').test(this.emailOrPhone)){
      console.log("This is a phone number")
      this.dataProvider.pageSetting.blur = true;
      this.verifyDetail(this.emailOrPhone,null).then((res:any)=>{
        console.log(res)
        this.userId = res.userId;
        this.sendResetOtp(this.emailOrPhone);
        this.step = "three";
      }).catch((err:any)=>{
        this.dataProvider.pageSetting.blur = false;
        this.alertify.presentToast(err.error)
      })
    }else{
      this.alertify.presentToast("Please enter a valid email or phone number")
    }
  }

  sendResetEmailLink(email){
    this.authService.resetPasswordWithEmail(email)
  }

  sendResetOtp(mobile){
    this.dataProvider.pageSetting.blur = true;
    this.serverService.getResetPasswordOtp(mobile).then((res:any)=>{
      this.alertify.presentToast(res.status)
      this.step='three'
    }).catch((err:any)=>{
      console.log(err)
      this.alertify.presentToast(err.error)
    })
    .finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }
 
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalPageComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  verifyOtp(){
    this.dataProvider.pageSetting.blur = true;
    this.serverService.verifyOtp(this.currentOtp,this.emailOrPhone).then((res:any)=>{
      this.alertify.presentToast(res.status)
      this.step = "four"
      // this.router.navigate(['/reset-password'])
    }).catch((err:any)=>{
      this.alertify.presentToast(err.error)
    })
    .finally(()=>{
      this.dataProvider.pageSetting.blur = false;
    })
  }

  verifyDetail(mobile?:string,email?:string){
    return this.serverService.verifyDetail(mobile,email)
  }

  resetPassword(){
    if(this.password != this.confirmPassword){
      this.dataProvider.pageSetting.blur = true;
      this.serverService.resetPassword(this.password,this.userId).then((res:any)=>{
        console.log(res)
        this.alertify.presentToast(res.status)
        this.router.navigate(['/login'])
      }).catch((err:any)=>{
        this.alertify.presentToast(err.error)
      }).finally(()=>{
        this.dataProvider.pageSetting.blur = false;
      })
    } else {
      this.alertify.presentToast("Passwords do not match")
    }
  }

}
