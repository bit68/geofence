import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';

import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  x: any;
  notificationAlreadyReceived = false;
  originalCoords;
  DISTANCE_TO_MOVE = 0;

  constructor(
    public backgroundMode: BackgroundMode,
    public platform: Platform,
    public geolocation: Geolocation,
    public localNotifications: LocalNotifications) {
    this.x = 1;

    platform.ready().then(() => {
      this.geolocation.getCurrentPosition()
        .then(position => {
          this.originalCoords = position.coords;
        })
        .catch((error) => {
          console.log('error', error);
        })

      this.backgroundMode.on('activate').subscribe((res) => {
        console.log('activated', res);
        setInterval(this.trackPosition, 2000);
      });

      this.backgroundMode.enable();
    })
  }

  trackPosition = () => {
    this.geolocation.getCurrentPosition()
      .then((position) => {
        console.log(position);
        this.showNotification();
      })
      .catch((error) => {
        console.log('error', error);
      })
  }



  showNotification = () => {
    this.localNotifications.schedule({
      id: this.x,
      text: 'There is a legendary Pokemon near you'
    });

    this.notificationAlreadyReceived = true;
    this.x++;
  }


}