import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LogoutProvider } from '../../providers/logout/logout';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public logout: LogoutProvider, public navCtrl: NavController) {

  }
}
