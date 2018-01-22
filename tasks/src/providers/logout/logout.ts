import { App } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LogoutProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LogoutProvider {

  constructor(public app: App, public storage: Storage) {
  }

  do() {
    this.storage.clear();

    let nav = this.app.getActiveNav();
    nav.setRoot('LoginPage')
  }

}
