import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import { LogoutProvider } from '../../providers/logout/logout';

/**
 * Generated class for the TasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {

  constructor(
    public logout: LogoutProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    public tasks: TasksProvider,
  ) {
  }

  ionViewDidLoad() {
    this.tasks.search(this.tasks.choose);
  }

}
