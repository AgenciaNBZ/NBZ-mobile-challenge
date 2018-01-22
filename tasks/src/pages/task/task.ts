import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { AlertProvider } from '../../providers/alert/alert';
import { RestfulProvider } from '../../providers/restful/restful';
import * as moment from 'moment';

/**
 * Generated class for the TaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  task: any = {};
  user: any = {};

  constructor(
    public alert: AlertProvider,
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public restful: RestfulProvider,
    public viewCtrl: ViewController,
  ) {
  }

  ionViewDidLoad() {
    this.task = this.navParams.get('task') || {};
    this.user = this.navParams.get('user') || {};
  }

  edit() {
    this.navCtrl.push('TaskFormPage', { task: this.task, user: this.user })
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  /**
   * This function will print a date on a determintated format
   *
   * @param  date Date string
   * @return      void
   */
  datePrint(date, format) {
    return moment(date).locale('Pt-br').format(format)
  }

  delete() {
    this.alert.confirm(
      "OPA!",
      "Quer mesmo excluir '" + this.task.name + "'?",
       [{text: 'Não'}, {text: 'Quero', handler: () => {
         this.remove()
       }}]
    )
  }

  remove() {
    this.restful.request('delete', '/tasks/' + this.task.id, {token: this.user.token});
    this.events.publish('task:modify', this.user, Date.now());
    this.closeModal();
  }

}
