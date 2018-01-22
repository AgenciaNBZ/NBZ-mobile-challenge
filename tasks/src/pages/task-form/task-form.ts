import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { RestfulProvider } from '../../providers/restful/restful';
import * as moment from 'moment';

/**
 * Generated class for the TaskFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {
  task: any = {};
  user: any = {};
  method: string = 'post';
  id: string = '';

  constructor(
    public events: Events,
    public navCtrl: NavController,
    public navParams: NavParams,
    public restful: RestfulProvider,
  ) {
  }

  ionViewDidLoad() {
    this.task = this.navParams.get('task') || {};
    this.user = this.navParams.get('user') || {};

    if (this.task.due_date) {
      this.task.date = moment(this.task.due_date).format("YYYY-MM-DD");
      this.task.hour = moment(this.task.due_date).format("HH:mm");

      this.method = 'put';
      this.id = this.task.id;
    }
  }

  save() {
    this.task.due_date = this.task.date + " " + this.task.hour + ":00";
    this.task.token = this.user.token;
    this.task.user_id = this.user.id;

    this.restful.request(this.method, '/tasks/' + this.id, this.task);

    this.events.publish('task:modify', this.user, Date.now());
    this.navCtrl.pop();
  }
}
