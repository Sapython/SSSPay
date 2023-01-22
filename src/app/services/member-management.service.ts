import { Injectable } from '@angular/core';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Member } from '../pages/groups/manage-members/manage-members.page';
import { DataProvider } from '../providers/data.provider';
import { UserData } from '../structures/user.structure';

@Injectable({
  providedIn: 'root',
})
export class MemberManagementService {
  
  
  access = [
    'admin',
    'superDistributor',
    'masterDistributor',
    'distributor',
    'retailer',
    'guest',
  ];
  constructor(private fs: Firestore, private dataProvider: DataProvider) {}

  getMembers() {
    return getDocs(
      collection(
        this.fs,
        'users/' + this.dataProvider.userData?.userId + '/members'
      )
    );
  }

  getGroups(){
    return getDocs(
      collection(
        this.fs,
        'groups'
      )
    );
  }

  getGroup(groupId: string) {
    return getDoc(doc(this.fs, 'groups/' + groupId));
  } 

  async getUnassignedMembers(currentOwnerId: string) {
    console.log("access.access",this.allowedAccess(this.dataProvider.userData.access.access+1));
    const users = await getDocs(query(collection(this.fs, 'users'),where('access.access','in',this.allowedAccess(this.dataProvider.userData.access.access))));
    return users.docs.filter((user) => {
      return user.data().ownerId != currentOwnerId;
    }).map((user) => user.data());
  }

  allowedAccess(access: string) {
    return this.access.slice(this.access.indexOf(access)+1);
  }

  async assignMember(memberId: string,access:any,ownerId:string) {
    try {
      return updateDoc(doc(this.fs, 'users/' + memberId), {
        memberAssigned: true,
        ownerId:ownerId,
        access:{
          access:access
        }
      });
      //  setDoc(doc(this.fs, 'groups/'+groupId + '/members', member.userId), newMember)
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getGroupMembers(groupId:string){
    return getDoc(
      doc(
        this.fs,
        'groups/' + groupId
      )
    );
    // let members = []
    // res.data().members.forEach(async (memberId:string) => {
    //   const member = await getDoc(
    //     doc(
    //       this.fs,
    //       'users/' + memberId
    //     )
    //   );
    //   members.push(member.data())
    // })
  }

  async deleteMember(userId:string,groupId:string,member) {
    await updateDoc(doc(this.fs, 'users/' + userId), {
      memberAssigned: false,
      access:{
        access:"guest"
      }
    });
    return updateDoc(
      doc(
        this.fs,
        'groups/' + groupId
      ),
      {
        members:arrayRemove(member)
      }
    );
  }

  updateMember(member: Member) {}

  createGroup(value: any) {
    return addDoc(collection(this.fs, 'groups'), value);
  }

  getTransactions(userId: string) {
    return getDocs(collection(this.fs, 'users/' + userId + '/transactions'));
  }

  getOwnerBasedUsers(userId:string){
    return getDocs(query(collection(this.fs, 'users'),where('ownerId','==',userId)));
  }
}
