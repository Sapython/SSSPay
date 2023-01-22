import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { MemberManagementService } from 'src/app/services/member-management.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { UserData } from 'src/app/structures/user.structure';
import { AddNewMemberComponent } from '../add-new-member/add-new-member.component';
import { AddMemberComponent } from './manage-members/add-member/add-member.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit, OnDestroy {
  groups: any[] = []
  newGroupForm:FormGroup =  new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required)
  });
  newGroupModalOpen:boolean = false;
  constructor(private memberService:MemberManagementService,private modalController:ModalController,public dataProvider:DataProvider,private router:Router,private alertify:AlertsAndNotificationsService) { }
  ngOnDestroy(): void {
    
  }
  currentUsers:any[] = [];
  levels:string[] = ['admin','superDistributor','masterDistributor','distributor','retailer']
  usersData:UserData[] = []
  currentOwner:UserData |undefined;
  loading:boolean = false;
  ngOnInit() {
    this.getOwnerUsers(this.dataProvider.userData);
  }

  getOwnerUsers(owner:UserData){
    if (owner.access.access == 'retailer') {
      this.router.navigate(['transactions/'+owner.userId])
      return;
    }
    this.currentOwner = owner;
    // add owner to usersData if not already there
    if(!this.usersData.find((user)=>user.userId == owner.userId)){
      this.usersData.push(owner);
      console.log(this.usersData)
    }
    this.loading = true;
    this.memberService.getOwnerBasedUsers(owner.userId).then((users)=>{
      this.currentUsers = users.docs.map((user)=>{
        return {
          ...user.data(),
          id:user.id
        }
      })
      // sort current users by name
      this.currentUsers.sort((a,b)=>{
        return a.displayName.localeCompare(b.displayName)
      })
    }).finally(()=>{
      this.loading = false;
    })
  }


  back(){
    let previousUser = this.usersData[this.usersData.findIndex((user)=>user.userId == this.currentOwner?.userId)-1]
    console.log("previousUser",previousUser)
    if(previousUser){
      this.getOwnerUsers(previousUser)
    } else {
      this.router.navigate(['../homepage'])
    }
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
    modal.onDidDismiss().then((data:any) => {
      console.log(data);
      if (data.data.user){
        this.memberService.assignMember(data.data.user.userId,data.data.access,this.dataProvider.userData.userId).then((res)=>{
          this.alertify.presentToast("Member assigned successfully");
        }).catch((err)=>{
          this.alertify.presentToast("Error assigning member");
        })
      }
    });
  }

  submit(){
    
  }

}
