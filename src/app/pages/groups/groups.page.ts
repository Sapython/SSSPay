import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private memberService:MemberManagementService,private modalController:ModalController,public dataProvider:DataProvider,private router:Router,private alertify:AlertsAndNotificationsService) { }
  superDistributors: any[] = [];
  masterDistributors: any[] = [];
  distributors: any[] = [];
  retailers: any[] = [];
  gettingSuperDistributors:boolean = false;
  gettingMasterDistributors:boolean = false;
  gettingDistributors:boolean = false;
  gettingRetailers:boolean = false;
  public currentLevel:string = "super-distributor";
  ngOnInit() {
    if (this.currentLevel == "super-distributor") {
      this.getSuperDistributors(this.dataProvider.userData.userId);
    } else if (this.currentLevel == "master-distributor") {
      this.getMasterDistributors(this.dataProvider.userData.userId);
    } else if (this.currentLevel == "distributor") {
      this.getDistributors(this.dataProvider.userData.userId);
    } else if (this.currentLevel == "retailer") {
      this.getRetailers(this.dataProvider.userData.userId);
    }
  }

  getSuperDistributors(userId:string){
    this.gettingSuperDistributors = true;
    this.memberService.getOwnerBasedUsers(userId).then((users)=>{
      this.superDistributors = [];
      users.forEach((user)=>{
        console.log(user.data());
        this.superDistributors.push(user.data());
      })
    }).finally(()=>{
      this.gettingSuperDistributors = false;
    })
  }

  getMasterDistributors(userId:string){
    this.gettingMasterDistributors = true;
    this.memberService.getOwnerBasedUsers(userId).then((users)=>{
      this.masterDistributors = [];
      users.forEach((user)=>{
        console.log(user.data());
        this.masterDistributors.push(user.data());
      })
    }).finally(()=>{
      this.gettingMasterDistributors = false;
    })
  }

  getDistributors(userId:string){
    this.gettingDistributors = true;
    this.memberService.getOwnerBasedUsers(userId).then((users)=>{
      this.distributors = [];
      users.forEach((user)=>{
        console.log(user.data());
        this.distributors.push(user.data());
      })
    }).finally(()=>{
      this.gettingDistributors = false;
    })
  }

  getRetailers(userId:string){
    this.gettingRetailers = true;
    this.memberService.getOwnerBasedUsers(userId).then((users)=>{
      this.retailers = [];
      users.forEach((user)=>{
        console.log(user.data());
        this.retailers.push(user.data());
      })
    }).finally(()=>{
      this.gettingRetailers = false;
    })
  }

  back(){
    if (this.currentLevel == "super-distributor") {
      this.router.navigate(['../homepage']).catch((err)=>{
        console.log(err);
      });
    } else if (this.currentLevel == "master-distributor") {
      this.currentLevel = "super-distributor";
    } else if (this.currentLevel == "distributor") {
      this.currentLevel = "master-distributor";
    } else if (this.currentLevel == "retailer") {
      this.currentLevel = "distributor";
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
  }

}
