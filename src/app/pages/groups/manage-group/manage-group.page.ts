import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.page.html',
  styleUrls: ['./manage-group.page.scss'],
})
export class ManageGroupPage implements OnInit {
  memberId: string;
  constructor(private activatedRoute:ActivatedRoute,public dataProvider:DataProvider) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.memberId = params['groupId'];
    })
  }

  ngOnInit() {
    
  }

}
