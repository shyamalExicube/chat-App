import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase'
import { ServiceProvider } from '../providers/service/service';
import { HttpClientModule } from '@angular/common/http';
import { SigninPageModule } from '../pages/signin/signin.module';
import { RegistrationPageModule } from '../pages/registration/registration.module';
import { ChatpagePageModule } from '../pages/chatpage/chatpage.module';




  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB2X11DHiZ_28dlWdaeaJnIAFLO5kNf28M",
    authDomain: "myproject-6206f.firebaseapp.com",
    databaseURL: "https://myproject-6206f.firebaseio.com",
    projectId: "myproject-6206f",
    storageBucket: "myproject-6206f.appspot.com",
    messagingSenderId: "628832079892"
  };
  firebase.initializeApp(config);


@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SigninPageModule,
    RegistrationPageModule,
    ChatpagePageModule,
    IonicModule.forRoot(MyApp)
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
    ServiceProvider
  ]
})
export class AppModule {}
