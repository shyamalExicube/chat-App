import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'
import { ChatpagePage } from '../chatpage/chatpage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public email:any;
  public password:any;
  public currentUser:any;
  public activeUsers:any=[]

  constructor(public navCtrl: NavController,
    public navParam:NavParams) {
   firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.currentUser=user
       }
      })
    let users=firebase.database().ref(`users/`);
    users.once('value',snapUser=>{
      console.log(snapUser.val());
      let allUsers=snapUser.val();
      for(let key in allUsers){
        allUsers[key].keyId=key;
        if(this.currentUser.uid != key){
          this.activeUsers.push(allUsers[key]);
        } 
      }
      console.log(this.activeUsers);
    })
  }

  itemSelected(item){
    this.navCtrl.push(ChatpagePage,{particularUser:item});
  }

  logOut(){
    firebase.auth().signOut();
    console.log("logout clicked");
  }
}
