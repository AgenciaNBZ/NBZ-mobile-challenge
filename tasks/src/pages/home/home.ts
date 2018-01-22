import { Component } from '@angular/core';
import { IonicPage, Events } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import { LogoutProvider } from '../../providers/logout/logout';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public events: Events,
    public logout: LogoutProvider,
    public tasks: TasksProvider,
  ) {
    events.subscribe('task:modify', (user, time) => {
      this.tasks.getTasks();
    });
  }

  /**
   * When a page Will enter, this function will request user tasks
   *
   * @return void
   */
  ionViewWillLoad() {
    this.tasks.load();
  }
}
