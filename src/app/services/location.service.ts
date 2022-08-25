import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  // constructor(private geolocation: Geolocation) {
    
  // }

  async getLatitudeAndLongitude(): Promise<any> {
    window.navigator.geolocation.getCurrentPosition((position) => {
      console.log("getCurrentPosition",position.coords.latitude,position.coords.longitude);
    });
    const position:Position = await Geolocation.getCurrentPosition();
    if (position) {
      return {
        status: true,
        message: 'Latitude and longitude fetched',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
    } else {
      return {
        status: false,
        message: 'Error getting location',
      };
    }
    
  }
}
