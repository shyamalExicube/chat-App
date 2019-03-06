import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service';
import { SigninPage } from '../signin/signin';

/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {
  public name:any;
  public email:any;
  public password:any;
  public phoneNo:any

  constructor(public navCtrl: NavController, public navParams: NavParams,public service:ServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrationPage');
  }

  isvalidEmailFormat(email){ 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(email);
  }
  register(){
    if(this.name == '' || this.name == undefined || this.name == null){
      alert("Name field can not be blanked");
    }else if(this.phoneNo == '' || this.phoneNo == undefined || this.phoneNo == null){
     alert("phone no field can not be blanked");
    }else if(this.email == '' || this.email == undefined || this.email == null){
      alert("email field can not be blanked");
    }else if(!this.isvalidEmailFormat(this.email)){
      alert("please provide a valid mail id");
    }else if(this.password == '' || this.password == undefined || this.password == null){
    alert("password can not be blanked");
    }else{
      let uData={
        name:this.name,
        email: this.email,
        password:this.password,
        phoneNo:this.phoneNo,
    }
      this.service.registration(uData).then((res:any)=>{
        console.log(res);
        if(res){
          this.navCtrl.setRoot(SigninPage);
          alert("You have Successfully Registered");
        }
       }).catch((error)=>{
        console.log(error);
       }) 
    }
  }
  signIn(){
    this.navCtrl.push(SigninPage);
  }
}
