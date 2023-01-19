import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { MemberManagementService } from 'src/app/services/member-management.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { AddNewMemberComponent } from '../add-new-member/add-new-member.component';
import { AddMemberComponent } from './manage-members/add-member/add-member.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  groups: any[] = []
  newGroupForm:FormGroup =  new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required)
  });
  newGroupModalOpen:boolean = false;
  constructor(private memberService:MemberManagementService,private modalController:ModalController,public dataProvider:DataProvider,private alertify:AlertsAndNotificationsService) { }

  ngOnInit() {
    this.getGroups()
  }

  getGroups(event?:any){
    this.memberService.getGroups().then((groups)=>{
      this.groups = groups.docs.map((group)=>{
        return {
          ...group.data(),
          id:group.id
        }
      });
    }).catch((err)=>{
      this.alertify.presentToast("Error fetching groups");
    }).finally(()=>{
      if(event){
        event.target.complete();
      }
    })
    
  }

  createGroup(){
    this.memberService.createGroup(this.newGroupForm.value).then((group)=>{
      this.alertify.presentToast("Group created successfully");
      this.newGroupModalOpen = false;
      this.getGroups();
    }).catch((err)=>{
      this.alertify.presentToast("Error creating group");
    })
  }

  async addNewMember() {
    const modal = await this.modalController
      .create({
        component: AddNewMemberComponent,
        swipeToClose: true,
        breakpoints: [0.25, 0.99],
        initialBreakpoint: 0.99,
        canDismiss:true
      })
    await modal.present();
    modal.onDidDismiss().then((data) => {
      console.log(data);
    })
  }

  async addMember() {
    const modal = await this.modalController.create({
      component: AddMemberComponent,
      swipeToClose: true,
      breakpoints: [0.25, 0.75, 0.9],
      initialBreakpoint: 0.25,
      componentProps: {
        accessLevel: this.dataProvider.userData.access.access
      },
    });
    await modal.present();
  }

}
