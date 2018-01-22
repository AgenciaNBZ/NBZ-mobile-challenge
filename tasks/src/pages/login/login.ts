import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestfulProvider } from '../../providers/restful/restful';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  credential: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restful: RestfulProvider, public storage: Storage) {
  }

  login() {
    var self = this;

    this.restful.request("post", "/login", this.credential, function(data) {
      self.storage.set('user', data.success);
      self.navCtrl.setRoot('TabsPage')
    })
  }

  register() {
    this.navCtrl.push('RegisterPage')
  }

}
