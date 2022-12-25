import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ModalController, PopoverController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { MemberManagementService } from 'src/app/services/member-management.service';
import { AlertsAndNotificationsService } from 'src/app/services/uiService/alerts-and-notifications.service';
import { UserAccess } from 'src/app/structures/user.structure';
import { AddMemberComponent } from './add-member/add-member.component';
import Fuse from 'fuse.js';
import { AddNewMemberComponent } from '../../add-new-member/add-new-member.component';

@Component({
  selector: 'app-manage-members',
  templateUrl: './manage-members.page.html',
  styleUrls: ['./manage-members.page.scss'],
})
export class ManageMembersPage implements OnInit {
  members: any[] = [];
  gettingData: boolean = false;
  filteredMembers: Member[] = [];
  cardOpen: boolean = false;
  currentAccess: string = '';
  constructor(
    private memberService: MemberManagementService,
    private alertify: AlertsAndNotificationsService,
    public dataProvider: DataProvider,
    private modalController: ModalController,
    private popupController: PopoverController
  ) {}
  access = [
    'superDistributor',
    'masterDistributor',
    'distributor',
    'retailer',
    'guest',
  ];
  async ngOnInit() {
    await this.getMembers().catch((error) => {
      console.log('Members', error);
    });
  }
  async getMembers() {
    console.log('Getting Members');
    this.members = [];
    try {
      this.gettingData = true;
      const members = await this.memberService.getGroupMembers(
        this.dataProvider.dataOne.id
      );
      members.data()['members'].forEach((doc) => {
        this.members.push(doc);
      });
      this.gettingData = false;
      console.log('members', this.members);
    } catch (error) {
      console.log(error);
      this.alertify.presentToast(error, 'error');
    }
  }
  searchMember(event) {
    console.log('Search', event);
    if (event.detail.value) {
      const options = {
        keys: ['displayName', 'userId', 'email', 'phoneNumber'],
      };
      const fuse = new Fuse(this.members, options);
      this.filteredMembers = [];
      const results = fuse.search(event.detail.value);
      results.forEach((element) => {
        this.filteredMembers.push(element.item);
      });
    } else {
      this.filteredMembers = [];
    }
  }

  doRefresh(event) {
    console.log('Refresh', event);
    this.getMembers().finally(() => {
      event.target.complete();
    });
  }

  seeTransactions() {}

  deleteMember(member: Member) {
    if (confirm('Are you sure you want to delete ' + member.displayName)) {
      this.memberService
        .deleteMember(member.userId, this.dataProvider.dataOne.id, member)
        .then(() => {
          this.alertify.presentToast(member.displayName + ' deleted');
          this.getMembers();
        })
        .catch((error) => {
          this.alertify.presentToast(error, 'error');
        })
        .finally(() => {
          alert('finally');
        });
    }
  }
  async addMember() {
    const modal = await this.modalController.create({
      component: AddMemberComponent,
      swipeToClose: true,
      breakpoints: [0.25, 0.75, 1],
      initialBreakpoint: 0.25,
      componentProps: {
        accessLevel: this.dataProvider.userData.access.access,
        assignedUsers: this.members.map((member) => member.userId),
      },
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.dataProvider.pageSetting.blur = true;
        this.memberService
          .assignMember(
            this.dataProvider.userData,
            data.data.user,
            data.data.access,
            this.dataProvider.dataOne.id
          )
          .then((doc) => {
            console.log(doc);
            this.getMembers();
            this.alertify.presentToast(
              (data.data.user?.displayName ||
                data.data.user?.phoneNumber ||
                data.data.user?.email) + ' assigned as member'
            );
          })
          .catch((error) => {
            this.alertify.presentToast(error, 'error');
          })
          .finally(() => {
            this.dataProvider.pageSetting.blur = false;
          });
      }
    });
  }

  switchGroup() {
    this.dataProvider.pageSetting.blur = true;
    this.memberService
      .assignMember(
        this.dataProvider.userData,
        this.dataProvider.userData,
        this.dataProvider.userData.access.access,
        this.dataProvider.dataOne.id
      )
      .then((doc) => {
        console.log(doc);
        this.getMembers();
        this.alertify.presentToast(
          (this.dataProvider.userData?.displayName ||
            this.dataProvider.userData?.phoneNumber ||
            this.dataProvider.userData?.email) + ' assigned as member'
        );
      })
      .catch((error) => {
        console.log(error);
        
        this.alertify.presentToast(error, 'error');
      })
      .finally(() => {
        this.dataProvider.pageSetting.blur = false;
      });
  }

  async addNewMember() {
    const modal = await this.modalController.create({
      component: AddNewMemberComponent,
      componentProps: {
        id: this.dataProvider.dataOne.id,
      },
      swipeToClose: true,
      breakpoints: [0.25, 0.99],
      initialBreakpoint: 0.99,
      canDismiss: true,
    });
    await modal.present();
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.getMembers();
    });
  }
}

export type Member = {
  id?: string;
  userId: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  access: UserAccess;
  ownerId: string;
  joining: any;
};
