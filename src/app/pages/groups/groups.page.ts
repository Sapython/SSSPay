import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class GroupsPage implements OnInit, OnDestroy {
  groups: any[] = []
  newGroupForm:FormGroup =  new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required)
  });
  newGroupModalOpen:boolean = false;
  constructor(private memberService:MemberManagementService,private modalController:ModalController,public dataProvider:DataProvider,private router:Router,private alertify:AlertsAndNotificationsService) { }
  ngOnDestroy(): void {
    this.currentLevel = '';
  }
  superDistributors: any[] = [];
  masterDistributors: any[] = [];
  distributors: any[] = [];
  retailers: any[] = [];
  gettingSuperDistributors:boolean = false;
  gettingMasterDistributors:boolean = false;
  gettingDistributors:boolean = false;
  gettingRetailers:boolean = false;
  levels:string[] = ['admin','superDistributor','masterDistributor','distributor','retailer']
  public currentLevel:string = '';
  ngOnInit() {
    this.currentLevel = '';
    if (this.levels[this.levels.indexOf(this.dataProvider.userData.access.access)+1]){
      this.currentLevel = this.levels[this.levels.indexOf(this.dataProvider.userData.access.access)+1]
    } else {
      this.alertify.presentToast('You are not authorized to access this page','error');
      this.router.navigate(['../homepage'])
    }
    if (this.currentLevel == "superDistributor") {
      this.getSuperDistributors(this.dataProvider.userData.userId);
    } else if (this.currentLevel == "masterDistributor") {
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
    // if user has access to superDistributor, then he can access masterDistributor, distributor and retailer
    // if user has access to masterDistributor, then he can access distributor and retailer
    // if user has access to distributor, then he can access retailer
    // if user has access to retailer, then he can access nothing
    if (this.levels[this.levels.indexOf(this.dataProvider.userData.access.access)+1]){
      console.log(this.currentLevel,this.levels[this.levels.indexOf(this.dataProvider.userData.access.access)+1]);
      if (this.currentLevel == this.levels[this.levels.indexOf(this.dataProvider.userData.access.access)+1]){
        this.router.navigate(['../homepage'])
      }
      // check if they have available access
      if (this.levels.indexOf(this.dataProvider.userData.access.access) < this.levels.indexOf(this.levels[this.levels.indexOf(this.currentLevel)-1])){
        this.currentLevel = this.levels[this.levels.indexOf(this.currentLevel)-1]
      } else {
        this.router.navigate(['../homepage'])
      }
      console.log(this.currentLevel)
    } else {
      this.alertify.presentToast('You are not authorized to access this page','error');
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
  }

}
