import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { MemberManagementService } from 'src/app/services/member-management.service';

@Component({
  selector: 'app-super-distributor',
  templateUrl: './super-distributor.page.html',
  styleUrls: ['./super-distributor.page.scss'],
})
export class SuperDistributorPage implements OnInit {

  constructor(private memberService:MemberManagementService,private dataProvider:DataProvider) { }
  superDistributors: any[] = [];
  ngOnInit() {
    console.log(this.dataProvider.userData.userId);
    
    this.memberService.getOwnerBasedUsers(this.dataProvider.userData.userId).then((users)=>{
      users.forEach((user)=>{
        console.log(user.data());
        this.superDistributors.push(user.data());
      })
    })
  }

  getSuperDistributors(userId:string){
    
  }

}
