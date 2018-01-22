import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**
 * Suricato Alert Provider
 *
 * Alert Provider for Ionic
 */
@Injectable()
export class AlertProvider {

  /**
   * @param  {AlertController} alertCtrl controller alert
   */
  constructor(public alertCtrl: AlertController) {}

  /**
   * Shows confirmation alert
   *
   * ``` js
   * alert.confirm('Hey!', 'Are you sure?', [{text: 'No'}, {text: 'Yes', handler: () => {this.remove(item)}}]);
   *
   * ```
   * @param  {string} title          alert title
   * @param  {string} message        alert message
   * @param  {array}  buttons        buttons for alert like [{text: '', handler: () => {}}]
   * @return {void}
   */
  confirm(title: string, message: string, buttons) {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    }).present();
  }

  /**
   * Shows generic alert
   *
   * ``` js
   * alert.confirm('Ops!', 'Invalid action!');
   *
   * ```
   *
   * @param  {string} title          alert title
   * @param  {string} message        alert message
   * @param  {array}  buttons        buttons for alert, default ['OK']
   * @return {void}
   */
  show(title: string, message: string, buttons = ['OK']) {
    this.alertCtrl.create({
      title: title,
      message: message,
      buttons: buttons
    }).present();
  }

}
