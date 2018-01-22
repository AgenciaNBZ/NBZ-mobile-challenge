import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestfulProvider } from '../../providers/restful/restful';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public restful: RestfulProvider) {
  }

  register() {
    var self = this;

    this.restful.request("post", "/register", this.user, function(data) {
      self.navCtrl.pop();
    })
  }
}
