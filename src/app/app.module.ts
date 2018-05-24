import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { BackgroundMode } from '@ionic-native/background-mode';
import { GeofencesProvider } from '../providers/geofences/geofences';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    LocalNotifications,
    BackgroundGeolocation,
    BackgroundMode,
    GeofencesProvider
  ]
})
export class AppModule {}
