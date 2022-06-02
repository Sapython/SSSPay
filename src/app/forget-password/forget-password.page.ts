import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {

  emailValue;
  constructor(  
    private alertCtrl:AlertController,
  ) { }

  ngOnInit() {
  }
  submitForgetPWD(){
    if(this.emailValue){
      console.log('email',this.emailValue);
    }else{
      console.log('enter email');
    }
  }
  onSend() {
    //  this.recipeService.deleteRecipe(this.loadedRecipe.id);
    this.alertCtrl.create({
      header: 'Check your mail',
      message: 'Do you really want to delete this message',
     
      buttons:[{
        text:'cancel',
        role:'cancel'
      },{
        text:'Delete',
       
      }]
    }).then(alertEl=> {
      alertEl.present();
    })
   
  }
  popup(){
    
  }
}
