import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase'

/**
 * Generated class for the ChatpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatpage',
  templateUrl: 'chatpage.html',
})
export class ChatpagePage {

  public currentUser:any;
  public activeUsers:any;
  public particularUserId:any;
  public user:boolean=false;
  public message:any;
  public senderId:any;
  public senderName:any;
  public userData:any;
  public messages:any=[];
  public usersmsgs:any

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userData=this.navParams.get('particularUser');
    this.particularUserId=this.userData.keyId
    firebase.auth().onAuthStateChanged((currentUser)=>{
      if(currentUser){
        this.senderId = currentUser.uid;
      }
        let users=firebase.database().ref(`users/`);
            users.on('value',snapUser=>{
              if(snapUser.val()){
                console.log(snapUser.val());
                let allUsers=snapUser.val();
                for(let key in allUsers){
                    if(this.senderId == key){
                      console.log(key);
                      console.log(allUsers[key]);
                      this.senderName = allUsers[key].name
                    }
                }
              }
            })
    })


  
    let users=firebase.database().ref(`users/`);
    users.on('value',snapUser=>{
      if(snapUser.val()){
        console.log(snapUser.val());
        let allUsers=snapUser.val();
        for(let key in allUsers){
          if(this.particularUserId == key){
            console.log(allUsers[this.particularUserId].message);
            let allMsg=allUsers[this.particularUserId].message;
            this.message=[];
            for(let key in allMsg){
              allMsg[key].msgKey=key;
               this.messages.push(allMsg[key]);
            }
            console.log(this.messages);
          }
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatpagePage');
  }
  send(){
    if(this.message == '' || this.message == undefined || this.message == null){
      alert("Message can not be blanked");
    }else{
      let users=firebase.database().ref(`users/`);
      users.on('value',snapUser=>{
        if(snapUser.val()){
          console.log(snapUser.val());
          let allUsers=snapUser.val();
          for(let key in allUsers){
               if(this.particularUserId == key){
                 this.user = true;
               }
          }
        }
      })
      if(this.user == true){
        // console.log(this.user);
        // alert("message found");
        firebase.database().ref(`users/` +this.particularUserId+`/message/`).push({
          message:this.message,
          senderId:this.senderId,
          senderName:this.senderName
        })
      }
  
    }
  }


}
