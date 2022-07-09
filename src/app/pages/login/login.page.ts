import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data.provider';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertsAndNotificationsService } from '../../services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  showCnfPwd = false;

  constructor(public authService:AuthenticationService,public alertify:AlertsAndNotificationsService,private dataProvider:DataProvider) { }
emailControl:FormControl = new FormControl('',[Validators.required,Validators.email])
  passwordControl:FormControl = new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(50)])
  signinForm:FormGroup = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });
  ngOnInit() {
  }
  login():void{
    console.log(this.signinForm);
    if (this.signinForm.status === 'VALID'){
      this.authService.loginEmailPassword(this.emailControl.value,this.passwordControl.value);
    } else {
      this.alertify.presentToast('Please fill all the fields correctly','error',3000);
    }
  }
  togglePassword(type){
    if(type === 'p'){
      this.showPassword = !this.showPassword;
    }
    else if(type === 'c'){
      this.showCnfPwd = !this.showCnfPwd;
    }
  }
}
