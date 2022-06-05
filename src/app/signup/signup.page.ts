import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../providers/data.provider';
import { AuthencationService } from '../services/authencation.service';
import { AlertsAndNotificationsService } from '../services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  showPassword = false;
  showCnfPwd = false;

  
  fullNameControl:FormControl = new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(50)])
  emailControl:FormControl = new FormControl('',[Validators.required,Validators.email])
  passwordControl:FormControl = new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(50)])
  confirmPasswordControl:FormControl = new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(50)])
  signupForm:FormGroup = new FormGroup({
    fullName: this.fullNameControl,
    email: this.emailControl,
    password: this.passwordControl,
    confirmPassword:this.confirmPasswordControl,
  });
  constructor(public authService:AuthencationService,public alertify:AlertsAndNotificationsService,private dataProvider:DataProvider) { }
  ngOnInit() {
  }
  signup():void{
    console.log(this.signupForm,this.confirmPasswordControl);
    if (this.signupForm.status === 'VALID'){
      if (this.signupForm.value.password === this.signupForm.value.confirmPassword){
        console.log(this.signupForm.value)
        this.authService.signUpWithEmailAndPassword(this.signupForm.value.email,this.signupForm.value.password,this.signupForm.value.fullName)
      } else {
        this.alertify.presentToast("Password and Confirm Password do not match",'error',3000);
      }
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
