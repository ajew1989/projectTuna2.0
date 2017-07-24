import { Injectable, NgZone } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
;
import 'rxjs/add/operator/filter';
// import $ from "jquery";

 
@Injectable()
export class LocationTracker {
 
  public watch: any;    
  public lat: number = 0;
  public lng: number = 0;
 
  constructor(public zone: NgZone,private backgroundGeolocation: BackgroundGeolocation,private geolocation: Geolocation) {};

 

 
 startTracking() {
 
  // Background Tracking
 
  let config = {
    desiredAccuracy: 0,
    stationaryRadius: 20,
    distanceFilter: 10, 
    debug: true,
    interval: 2000 
  };
 

  this.backgroundGeolocation.configure(config).subscribe((location) => {
 
    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
 
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = location.latitude;
      this.lng = location.longitude;
    });

    
    // if (this.lat < 35 && this.lat < 30) {
      // alert('You found a playlist');
    // }
 
  }, (err) => {
 
    console.log(err);
 
  });
 
  // Turn ON the background-geolocation system.
  this.backgroundGeolocation.start();
 
 
  // Foreground Tracking
 
let options = {
  frequency: 3000, 
  enableHighAccuracy: true
};
 
this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
  console.log(position);
  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    // if (this.lat < 35 && this.lat > 30 && this.lng < -84.3675 && this.lng > -84.4050) {
    //   alert('You are at TSL');
    // }
    if (this.lat < 35 && this.lat > 30 && this.lng < -84.3400 && this.lng > -84.3600) {
      alert('You found Cody');
    }
    if (this.lat < 35 && this.lat > 30 && this.lng < -84.3750 && this.lng > -84.3900) {
      alert('You found Avery');
    }
    if (this.lat < 35 && this.lat > 30 && this.lng < -84.1500 && this.lng > -84.3000) {
      alert("You found Avery's parents");
    }
  });
  
});

  }
}
