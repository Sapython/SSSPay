import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collectionData,
  DocumentReference,
  collectionSnapshots,
  CollectionReference,
  collection,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
  docSnapshots,
  docData,
  getDoc,
  getDocs,
  where,
  collectionChanges,
} from '@angular/fire/firestore';
import { query } from 'firebase/firestore';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { DataProvider } from '../providers/data.provider';
import { ContactRequest, UserData } from '../structures/user.structure';
import { AuthencationService } from './authencation.service';
import { AlertsAndNotificationsService } from './uiService/alerts-and-notifications.service';
import {
  Analytics,
  logEvent,
  setCurrentScreen,
  setUserProperties,
  setUserId,
} from '@angular/fire/analytics';

@Injectable({
  providedIn: 'root',
})
export class AdminDatabaseService {
  constructor(
    private analytics: Analytics,
    private fs: Firestore,
    private dataProvider: DataProvider,
    private authService: AuthencationService,
    private alertify: AlertsAndNotificationsService
  ) {}
  // Secuirty functions starts
  checkAdmin() {
    if(this.dataProvider.userData?.access.access !== 'admin'){
      this.alertify.presentToast('You are not an admin', 'error', 2000);
      return
    }
  }
  // Secuirty functions ends
  // Notification functions starts
  confirmChange() {
    logEvent(this.analytics, 'admin_change_settings');
    this.alertify.presentToast('Data saved', 'info', 1500);
  }
  // Notification functions ends
  // Admin data functions starts
  getSettings() {
    this.checkAdmin();
    // this.confirmChange();
    logEvent(this.analytics, 'admin_get_settings');
    return getDoc(doc(this.fs, 'adminData/settings'));
  }
  persistantData(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_persistant_data');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { persistantData: value },
      { merge: true }
    );
  }
  enableNewAccounts(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_enable_new_accounts');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { enableNewAccounts: value },
      { merge: true }
    );
  }
  enableGuestAccess(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_enable_guest_access');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { enableGuestAccess: value },
      { merge: true }
    );
  }
  summaryCardType(value: 'weekly' | 'monthly' | 'yearly') {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_summary_card_type');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { summaryCardType: value },
      { merge: true }
    );
  }
  // Tracking settings starts
  vehicleTracking(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_vehicle_tracking');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { vehicleTracking: value },
      { merge: true }
    );
  }
  employeeTracking(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_employee_tracking');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { employeeTracking: value },
      { merge: true }
    );
  }
  formTracking(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_form_tracking');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { formTracking: value },
      { merge: true }
    );
  }
  attendanceTracking(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_attendance_tracking');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { attendanceTracking: value },
      { merge: true }
    );
  }
  appUsageTracking(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_app_usage_tracking');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { appUsageTracking: value },
      { merge: true }
    );
  }
  // Tracking settings ends
  // Secuirty settings starts
  canAdminsChangeUsers(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_can_admins_change_users');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { allowAdminsToChangeUsers: value },
      { merge: true }
    );
  }
  canSupervisorManageUsers(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_can_supervisor_manage_users');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { allowSupervisorToManageUsers: value },
      { merge: true }
    );
  }
  canGuestSeeData(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_can_guest_see_data');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { allowGuestToSeeData: value },
      { merge: true }
    );
  }
  defaultAccessLevel(value: 'guest' | 'employee' | 'supervisor' | 'admin') {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_default_access_level');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { defaultAccessLevel: value },
      { merge: true }
    );
  }
  allowSignout(value: boolean) {
    this.checkAdmin();
    this.confirmChange();
    logEvent(this.analytics, 'admin_allow_signout');
    return setDoc(
      doc(this.fs, 'adminData/settings'),
      { allowSignout: value },
      { merge: true }
    );
  }
  // Secuirty settings ends
  // Manage Users starts
  getUsers() {
    this.checkAdmin();
    return getDocs(collection(this.fs, 'users'));
  }
  getUsersSubscription(){
    this.checkAdmin();
    return collectionData(collection(this.fs,'users'))
  }
  userAction(value: 'remove' | 'block' | 'reset' | 'none', userId: string) {
    this.checkAdmin();
    if (value === 'remove') {
      this.confirmChange();
      logEvent(this.analytics, 'admin_remove_user');
      if (userId !== this.dataProvider.userData?.userId) {
        return deleteDoc(doc(this.fs, 'users/' + userId));
      } else {
        return Promise.reject('You cannot remove yourself');
      }
    } else if (value === 'block') {
      this.confirmChange();
      logEvent(this.analytics, 'admin_block_user');
      return updateDoc(doc(this.fs, 'users/' + userId), {
        status: { access: 'blocked' },
      });
    } else if (value === 'reset') {
      this.confirmChange();
      logEvent(this.analytics, 'admin_reset_user');
      const resetUserData:UserData | any = {
        attendanceCount: 0,
        attendanceDate: '',
        bloodGroup:{bloodGroup:'Unknown'},
        currentAddress: '',
        department:{department:'godown'},
        designation:{designation:'unloadingSupervisor'},
        permanentAddress:'',
        photoURL:'',
        status:{access:'inactive',isOnline:false},
        access:{access:'guest'},
      }
      return updateDoc(doc(this.fs, 'users/' + userId), resetUserData);
    } else {
      return Promise.reject('Invalid action');
    }
  }
  // Manage Users ends
  // Admin data functions ends
}
