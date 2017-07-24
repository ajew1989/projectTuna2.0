import { Component, Input, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker/location-tracker';
import $ from 'jquery';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements AfterViewInit {
  @Input() public latitude: number;


  ngOnChanges(changes: any) {

    this.checkLat(changes.latitude.currentValue);

}
 
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker) {
 
  }

  ngAfterViewInit() {
    // viewChild is set after the view has been initialized
    this.locationTracker.startTracking();
  }

  start() {
    this.locationTracker.startTracking();
  }

  checkLat(lat) {
    if (lat < 35 && lat > 30) {
      alert('You found a playlist');
    }
    console.log('here')
  }
 
}

// $( document ).ready(function() {
//     $('#current_latitude').change(function() {
//       if ($('#current_latitude').val() < 35 && $('#current_latitude').val() > 30) {
//         alert('You found a playlist');
//       }
//     })
// });