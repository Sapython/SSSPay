import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.page.html',
  styleUrls: ['./error-page.page.scss'],
})
export class ErrorPagePage implements OnInit {
  text:string = ''
  type:string = ''
  constructor(private activatedRoute:ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((params)=>{
      this.text = params['text'];
      this.type = params['type'];
    })
  }

  ngOnInit() {
  }

}
