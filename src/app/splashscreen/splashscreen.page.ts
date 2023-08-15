import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.page.html',
  styleUrls: ['./splashscreen.page.scss'],
  animations:[
  ]
})
export class SplashscreenPage implements OnInit {
  stages:string[] = [
    'loading',
    'authenticating',
    'securing',
    'starting'
  ] 
  counter:number=0;
  status:string = '';
  constructor() { }

  ngOnInit() {

    setInterval(() => {
      this.counter++;
      if(this.counter>=this.stages.length){
        this.counter=0;
      }
      this.status = this.stages[this.counter];
    },2000)
  }

}
