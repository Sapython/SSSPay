import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { DatabaseService } from 'src/app/services/database.service';
import { MemberManagementService } from 'src/app/services/member-management.service';
import { ServerService } from 'src/app/services/server.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.scss'],
})
export class AddNewMemberComponent implements OnInit {
  // allowedAccess:string[] = []
  photo: any;
  addNewMemberForm: FormGroup = new FormGroup({
    displayName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    aadhaarNumber: new FormControl('', [Validators.required]),
    panNumber: new FormControl('', [Validators.required]),
    dob: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    access: new FormControl(''),
    state: new FormControl(''),
    city: new FormControl(''),
    pincode: new FormControl(''),
    address: new FormControl(''),
  });
  constructor(
    private serverService: ServerService,
    private dataProvider: DataProvider,
    private alertify: AlertsAndNotificationsService,
    private databaseService: DatabaseService,
    private memberService: MemberManagementService,
    private modalController:ModalController
  ) {}
  access = [
    'superDistributor',
    'masterDistributor',
    'distributor',
    'retailer',
    'guest',
  ];
  ngOnInit() {}
  generateRandomId() {
    return Math.random().toString(36).substr(2, 9);
  }
  async submit() {
    console.log('Form Data', this.addNewMemberForm);
    console.log('Photo', this.photo);
    if (this.addNewMemberForm.valid) {
      this.dataProvider.pageSetting.blur = true;
      console.log('Valid Form Data', this.addNewMemberForm);
      this.serverService
        .createNewUser(this.addNewMemberForm.value)
        .then((res) => {
          this.alertify.presentToast('User Created Successfully');
          this.memberService
            .assignMember(this.dataProvider.userData, res.newUser, res.newUser.access.access)
            .then((doc) => {
              console.log(doc.id);
              this.alertify.presentToast(
                res.newUser.displayName + ' assigned as member'
              );
              this.modalController.dismiss()
            })
            .catch((error) => {
              this.alertify.presentToast(error, 'error');
            })
            .finally(() => {
              this.dataProvider.pageSetting.blur = false;
            });
        })
        .catch((error) => {
          this.dataProvider.pageSetting.blur = true;
          if (error.message) {
            this.alertify.presentToast(error.message, 'error');
          } else {
            this.alertify.presentToast(error, 'error');
          }
        });
    } else {
      console.log('invalid', this.addNewMemberForm);
      this.alertify.presentToast('Please fill all the fields', 'error');
    }
  }
  allowedAccess(): string[] {
    return this.access.slice(
      this.access.indexOf(this.dataProvider.userData.access.access) + 1
    );
  }
}
