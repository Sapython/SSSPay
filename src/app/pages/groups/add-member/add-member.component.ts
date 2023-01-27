import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { MemberManagementService } from 'src/app/services/member-management.service';
import { UserData } from 'src/app/structures/user.structure';
import Fuse from 'fuse.js';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss'],
})
export class AddMemberComponent implements OnInit {
  @Input() accessLevel:string = '';
  @Input() assignedUsers:string[] = [];
  isOpen = false;
  selectedUser:UserData = null;
  constructor(private memberService:MemberManagementService,public ctrl:ModalController,public dataProvider:DataProvider,private popupController:PopoverController) { }
  members:UserData[] = [];
  filteredMembers: UserData[] = [];
  access = [
    'admin',
    'superDistributor',
    'masterDistributor',
    'distributor',
    'retailer',
  ];
  ngOnInit() {
    this.memberService.getUnassignedMembers(this.dataProvider.userData.userId).then((data)=>{
      console.log("Members",data);
      data.forEach((doc:any)=>{
        this.members.push(doc);
      })
    });
  }
  allowedAccess() {
    return this.access.slice(this.access.indexOf(this.dataProvider.userData.access.access)+1);
  }
  selected(user){
    this.selectedUser = user;
    this.isOpen = true;
  }
  accessSelected(access){
    access=access.detail.value;
    console.log("Access",access);
    if(confirm('Are you sure you want '+this.selectedUser.displayName+' to be a '+access+'?')){
      this.isOpen = false;
      this.ctrl.dismiss({user:this.selectedUser,access:access});
    }
  }
  searchUser(event:any){
    console.log('Search', event);
    if (event.detail.value) {
      const options = { keys: ['displayName','userId','email','phoneNumber'] };
      const fuse = new Fuse(this.members, options);
      this.filteredMembers = []
      const results = fuse.search(event.detail.value);
      results.forEach(element => {
        this.filteredMembers.push(element.item);
      });
    } else {
      this.filteredMembers = [];
    }
  }

  addNewMember(){
    this.ctrl.dismiss('addNewMember');
  }
}
