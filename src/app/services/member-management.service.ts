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

  async getUnassignedMembers(assignedUsers: string[]) {
    console.log("access.access",this.allowedAccess(this.dataProvider.userData.access.access));
    const users = await getDocs(query(collection(this.fs, 'users'),where('access.access','in',this.allowedAccess(this.dataProvider.userData.access.access))));
    return users.docs.filter((doc) => {
      console.log(doc.data().userId,doc.data().displayName);
      return (!doc.data().groupId);
    });
  }

  allowedAccess(access: string) {
    return this.access.slice(this.access.indexOf(access)+1);
  }

  async assignMember(user: UserData, member: UserData,access:any,groupId:string) {
    try {
      await updateDoc(doc(this.fs, 'users/' + member.userId), {
        memberAssigned: true,
        groupId:groupId,
        access:{
          access:access
        }
      });
      const newMember: Member = {
        id: member.userId,
        displayName: member.displayName,
        email: member.email,
        userId: member.userId,
        phoneNumber: member.phoneNumber,
        photoURL: member.photoURL,
        access: {access:access},
        ownerId: this.dataProvider.userData?.userId,
        joining: new Date(),
      };
      console.log("newMember",newMember,groupId);
      return updateDoc(doc(this.fs,'groups/'+groupId),{
        members:arrayUnion(newMember)
      })
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

  getTransactions(groupId: string) {
    return getDocs(collection(this.fs, 'groups/' + groupId + '/transactions'));
  }
}
