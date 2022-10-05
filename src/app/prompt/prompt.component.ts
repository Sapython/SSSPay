import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss'],
})
export class PromptComponent implements OnInit {
  constructor(private modalController:ModalController) { }
  sendData(data:string){
    this.modalController.dismiss(data)
  }
  ngOnInit() {}

}
