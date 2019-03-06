import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase'

/*
  Generated class for the ServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceProvider {
  public fireAuth:any

  constructor(public http: HttpClient) {
    console.log('Hello ServiceProvider Provider');
    this.fireAuth = firebase.auth();
  }
  signIn(loginData){
    console.log(loginData);
    return this.fireAuth.signInWithEmailAndPassword(loginData.email,loginData.password);
  }

  registration(regData){
    console.log(regData);
    return firebase.auth().createUserWithEmailAndPassword(regData.email, regData.password)
        .then( newUser => {
          console.log(newUser);
          firebase.database().ref('/users/').child(newUser.uid).set({ 
            name:regData.name,
            email: regData.email,
            phoneNo:regData.phoneNo,
            type:'user'
          });
          })
  }


}
