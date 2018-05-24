import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { GeofencesProvider } from '../../providers/geofences/geofences';
import { BackgroundGeolocation, BackgroundGeolocationConfig } from '@ionic-native/background-geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  flag: any;
  withinRadius: any;
  response: any;
  geofences: any[];
  x: any;
  constructor(
    public backgroundMode: BackgroundMode,
    public platform: Platform,
    public geolocation: Geolocation,
    public localNotifications: LocalNotifications,
    private Geofences: GeofencesProvider,
    private BackgroundGeolocation: BackgroundGeolocation) {
    this.x = 1;
    this.geofences = [];

    platform.ready().then(() => {
      if (platform.is("ios")) {
        console.log("I'm IOS")
        this.backgroundMode.enable();

        this.Geofences.load().subscribe(res => {
          this.response = res;
          this.response.forEach(element => {
            this.geofences.push({
              "id": element.id,
              "title": element.notification.title,
              "text": element.notification.text,
              "icon": element.notification.icon,
              "lat": element.latitude,
              "lng": element.longitude,
              "radius": element.radius
            })
          });

          let config: any = {
            stopOnTerminate: false
          }
          this.BackgroundGeolocation.configure(config).subscribe(() => { this.BackgroundGeolocation.finish() })
          this.BackgroundGeolocation.start();
          this.geolocation.watchPosition().subscribe(res => {
            console.log(res);
            this.showNotification();
          })
          // for (let i = 0; i < this.geofences.length; i++) {
          //   let distance = Spherical.computeDistanceBetween({ lat: watchedLocation.coords.latitude, lng: watchedLocation.coords.longitude }, { lat: this.geofences[i].lat, lng: this.geofences[i].lng })
          //   if (this.geofences[i].radius >= distance) {
          //     if (this.withinRadius.indexOf(this.geofences[i]) < 0) {
          //       this.geofences[i].distance = distance;
          //       console.log("added to withinRadius");
          //       if (!this.flag) {
          //         this.withinRadius.push(this.geofences[i]);
          //         // Notify here
          //         break;
          //       }
          //     } else if (this.withinRadius.indexOf(this.geofences[i]) >= 0) {
          //       console.log("already in within radius");
          //     } else {
          //       console.log("unexpected behavior inner");
          //     }
          //   } else if (this.geofences[i].radius < distance) {
          //     if (this.withinRadius.indexOf(this.geofences[i]) >= 0) {
          //       this.withinRadius.splice(this.withinRadius.indexOf(this.geofences[i]), 1);
          //       console.log("removed from withinRadius");
          //     }
          //   } else {
          //     console.log("unexpected behaior outer")
          //   }
          // }





        })
      } else {
        console.log("I'm not IOS")
      }

      if (platform.is("android")) {
        console.log("I'm android")
      } else {
        console.log("I'm not android")
      }


      // this.geolocation.getCurrentPosition()
      //   .then(position => {
      //     this.originalCoords = position.coords;
      //     setInterval(this.trackPosition, 2000);

      //   })
      //   .catch((error) => {
      //     console.log('error', error);
      //   })

      // this.backgroundMode.on('activate').subscribe((res) => {
      //   console.log('activated', res);
      //   setInterval(this.trackPosition, 2000);
      // });


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
      text: this.x + 'There is a legendary Pokemon near you'
    });
    this.x++;
  }


}