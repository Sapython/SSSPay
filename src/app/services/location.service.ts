import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private geolocation: Geolocation) {}

  async getLatitudeAndLongitude(): Promise<any> {
    const position = await this.geolocation.getCurrentPosition();
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
