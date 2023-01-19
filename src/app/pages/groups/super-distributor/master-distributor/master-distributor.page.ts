import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { MemberManagementService } from 'src/app/services/member-management.service';

@Component({
  selector: 'app-master-distributor',
  templateUrl: './master-distributor.page.html',
  styleUrls: ['./master-distributor.page.scss'],
})
export class MasterDistributorPage implements OnInit {

  constructor(private memberService:MemberManagementService,private dataProvider:DataProvider) { }
  masterDistributors: any[] = [];
  ngOnInit() {
    console.log(this.dataProvider.userData.userId);
    
    this.memberService.getOwnerBasedUsers(this.dataProvider.userData.userId).then((users)=>{
      users.forEach((user)=>{
        console.log(user.data());
        this.masterDistributors.push(user.data());
      })
    })
  }

}
