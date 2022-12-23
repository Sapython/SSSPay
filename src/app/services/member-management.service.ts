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
    const users = await getDocs(collection(this.fs, 'users'));
    return users.docs.filter((doc) => {
      const condition =
        (doc.data().memberAssigned == undefined ||
          doc.data().memberAssigned == false ||
          doc.data().memberAssigned == null) &&
        doc.id != this.dataProvider.userData?.userId;
      const allowed = this.allowedAccess(this.dataProvider.userData.access.access)
      console.log("🚀 ~ file: member-management.service.ts ~ line 48 ~ MemberManagementService ~ returnusers.docs.filter ~ allowed", allowed,doc.data().access.access)
      return condition && (allowed.indexOf(doc.data().access.access) != -1 && !assignedUsers.includes(doc.id));
    });
  }

  allowedAccess(access: string) {
    return this.access.slice(this.access.indexOf(access)+1);
  }

  async assignMember(user: UserData, member: UserData,access:string,groupId:string) {
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
        access: member.access,
        ownerId: this.dataProvider.userData?.userId,
        joining: new Date(),
      };
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
}
