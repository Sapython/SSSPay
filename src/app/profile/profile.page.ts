import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data.provider';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public authService:AuthenticationService,public dataProvider:DataProvider) { }

  ngOnInit() {
  }

}
