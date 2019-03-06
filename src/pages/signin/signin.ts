import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { RegistrationPage } from '../registration/registration';
import { HomePage } from '../home/home';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  public email:any;
  public password:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  isvalidEmailFormat(email){ 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
  }


  signin(){
   if(this.email == '' || this.email == undefined || this.email == null){
     alert("email field can not be blanked");
   }else if(!this.isvalidEmailFormat(this.email)){
     alert("please provide a valid mail id");
   }else if(this.password == '' || this.password == undefined || this.password == null){

   }else{
    let userdata={
      email:this.email,
      password:this.password
    }
    this.service.signIn(userdata).then((response:any)=>{
      console.log(response);
      this.navCtrl.setRoot(HomePage);
     }).catch((error)=>{
     })
   }
  }
  register(){
    this.navCtrl.setRoot(RegistrationPage);
  }
}
