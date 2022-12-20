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
  members: Member[] = [];
  gettingData: boolean = false;
  filteredMembers: Member[] = [];
  cardOpen: boolean = false;
  currentAccess: string = '';
  constructor(
    private memberService: MemberManagementService,
    private alertify: AlertsAndNotificationsService,
    private dataProvider: DataProvider,
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
      const members = await this.memberService.getMembers();
      members.docs.forEach((doc) => {
        this.members.push({ ...doc.data(), id: doc.id } as Member);
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

  deleteMember(member: Member) {
    if (confirm('Are you sure you want to delete ' + member.displayName)) {
      this.memberService
        .deleteMember(member.id, member.userId)
        .then(() => {
          this.alertify.presentToast(member.displayName + ' deleted');
          this.getMembers();
        })
        .catch((error) => {
          this.alertify.presentToast(error, 'error');
        });
    }
  }
  async addMember() {
    const modal = await this.modalController.create({
      component: AddMemberComponent,
      swipeToClose: true,
      breakpoints: [0.25, 0.75, 0.9],
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
            data.data.access
          )
          .then((doc) => {
            console.log(doc.id);
            this.getMembers();
            this.alertify.presentToast(
              data.data.user.displayName + ' assigned as member'
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

  async addNewMember() {
    const modal = await this.modalController
      .create({
        component: AddNewMemberComponent,
        swipeToClose: true,
        breakpoints: [0.25, 0.99],
        initialBreakpoint: 0.99,
        canDismiss:true
      })
    await modal.present();
    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.getMembers();
    })
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
