import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { DataProvider } from '../../providers/data.provider';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  editMode:boolean = false;
  userDataForm:FormGroup = new FormGroup({
    displayName:new FormControl(this.dataProvider.userData.displayName,[Validators.required]),
    email:new FormControl(this.dataProvider.userData.email,[Validators.required]),
    phoneNumber:new FormControl(this.dataProvider.userData.phoneNumber,[Validators.required]),
    dob:new FormControl(this.dataProvider.userData.dob,[Validators.required]),
    state:new FormControl(this.dataProvider.userData.state,[Validators.required]),
    city:new FormControl(this.dataProvider.userData.city,[Validators.required]),
    pincode:new FormControl(this.dataProvider.userData.pincode,[Validators.required]),
    address:new FormControl(this.dataProvider.userData.address,[Validators.required]),
  })
  constructor(public authService:AuthenticationService,public dataProvider:DataProvider,private databaseService:DatabaseService) { }

  ngOnInit() {
    
  }

  async uploadImage(event){
    console.log(event);
    var file = event.target.files[0]
    // check if file is image and is less than 1 mb
    if(file.type.split('/')[0] !== 'image'){
      alert('Only images are allowed')
      return;
    }
    if(file.size > 1000000){
      alert('Image size should be less than 1 MB')
      return;
    }
    this.dataProvider.pageSetting.blur = true;
    let url = await this.databaseService.upload('users/'+this.dataProvider.userData.userId+'/profileImage',file)
    this.databaseService.updateUserData({photoURL:url})
    this.dataProvider.pageSetting.blur = false;
  }

  submit(){
    this.databaseService.updateUserData(this.userDataForm.value)
  }

}
