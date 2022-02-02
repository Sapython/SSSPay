import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  emailValue;
  constructor() { }

  ngOnInit() {
  }
  submitForgetPWD(){
    if(this.emailValue){
      console.log('email',this.emailValue);
    }else{
      console.log('enter email');
    }
  }
}
