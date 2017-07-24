import { Component, Input, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import { Geofence } from '@ionic-native/geofence'
// import $ from 'jquery';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements AfterViewInit {
  @Input() public latitude: number;


  ngOnChanges(changes: any) {

    // this.checkLat(changes.latitude.currentValue);

}
 
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker, private geofence: Geofence) {
    geofence.initialize().then(
    // resolved promise does not return a value
    () => console.log('Geofence Plugin Ready'),
    (err) => console.log(err)
  )
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    this.locationTracker.startTracking();
  }

  start() {
    this.locationTracker.startTracking();
  }

  
 
private addGeofence() {
  //options describing geofence
  let fence = {
    id: '6hrs', //any unique ID
    latitude:       33.778251, //center of geofence radius
    longitude:      -84.3884101,
    radius:         100, //radius to edge of geofence in meters
    transitionType: 3, //see 'Transition Types' below
    notification: { //notification settings
        id:             1, //any unique ID
        title:          'You crossed a fence', //notification title
        text:           'You found your first Playlist', //notification body
        openAppOnClick: true //open app when notification is tapped
    }
  }

  this.geofence.addOrUpdate(fence).then(
     () => console.log('Geofence added'),
     (err) => console.log('Geofence failed to add')
   );
}


}

// $( document ).ready(function() {
//     $('#current_latitude').change(function() {
//       if ($('#current_latitude').val() < 35 && $('#current_latitude').val() > 30) {
//         alert('You found a playlist');
//       }
//     })
// });