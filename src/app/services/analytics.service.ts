import { Injectable } from '@angular/core';
import { Analytics, logEvent,setCurrentScreen, setUserProperties, setUserId } from '@angular/fire/analytics';
import { DataProvider } from '../providers/data.provider';
@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private analytics:Analytics) {
  }
  setUser(uid){
    setUserId(this.analytics,uid);
  }
  setUserData(data){
    setUserProperties(this.analytics,data);
  }
}
