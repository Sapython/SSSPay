import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  showPassword = false;
  showCnfPwd = false;
  constructor() { }

  ngOnInit() {
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
