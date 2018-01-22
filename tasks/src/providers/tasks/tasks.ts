import { Injectable } from '@angular/core';
import { App, ModalController } from 'ionic-angular';
import { RestfulProvider } from '../../providers/restful/restful';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
/*
  Generated class for the TasksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksProvider {
  today = moment().format('YYYY-MM-DD');
  tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');
  tasks: any = [];
  reducedTasks: any = {};
  todayTasks: any = [];
  tomorrowTasks: any = [];
  result: any;
  user: any;
  choose: string = "next7";
  dates: any = [];
  backup: any = [];

  constructor(
    public app: App,
    public modalCtrl: ModalController,
    public restful: RestfulProvider,
    public storage: Storage,
  ) {
  }

  /**
   * This method will try get tasks from Storage
   * else it will call getTasks method
   *
   * @return void
   */
  load() {
    this.storage.get('tasks').then((tasks) => {
      if (tasks) {
        this.tasks = tasks || [];
        this.createReducedTasks();
      } else {
        this.getTasks();
      }
    });
  }

  /**
   * Request tasks from server using HTTP
   * and store tasks locale
   *
   * @return void
   */
  getTasks(refresher = null) {
    this.storage.get('user').then((user) => {
      this.user = user || {};

      if (this.user) {
        var self = this;
        this.restful.request('get', '/users/' + this.user.id + '/tasks/',
          { token: self.user.token },
          function(data) {
            self.tasks = data || [];
            self.storage.set('tasks', data);
            self.createReducedTasks();
            if (refresher) refresher.complete();
          }
        )
      }
    });
    if (refresher) refresher.complete();
  }

  /**
   * Reduce tasks array to an object using reduceToObj method
   * actualize dates
   * actualize todayTasks
   * actualize tomorrowTasks
   *
   * @return [description]
   */
  createReducedTasks() {
    this.reducedTasks = this.tasks.reduce(this.reduceToObj, {}) || {};
    this.dates = Object.keys(this.reducedTasks).sort() || [];
    this.backup = this.dates;
    this.todayTasks = this.reducedTasks[this.today];
    this.tomorrowTasks = this.reducedTasks[this.tomorrow];
  }


  /**
   * Creates an object from array
   * groupping elements from array by the due_date param
   *
   * @param  groups
   * @param  item each item from array
   * @return      Object
   */
  reduceToObj (groups, item) {
    if (item) {
      var val = moment(item['due_date']).format("YYYY-MM-DD");
      groups[val] = groups[val] || [];
      groups[val].push(item);
    }
    return groups;
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

  /**
   * This function will open a modal that will show details about task
   * @param  task Task Object
   * @return      void
   */
  show(task) {
    let modal = this.modalCtrl.create("TaskPage", {task: task, user: this.user});
    modal.onDidDismiss(data => {
    });
    modal.present();
  }

  /**
   * Returns a string that represents an icon based on task.type
   *
   * @param  type task.type
   * @return      string that represents an icon
   */
  getIcon(type) {
    if (type == "home") return "home";
    if (type == "class") return "bookmarks";
    if (type == "exam") return "md-list-box";
    if (type == "medichal") return "medkit";
    return "circle";
  }

  /**
   * Returns a string that represents an color based on task.type
   *
   * @param  type task.type
   * @return      string that represents an color
   */
  getColor(type) {
    if (type == "home") return "mfBlue";
    if (type == "class") return "mfYellow";
    if (type == "exam") return "mfPink";
    return "primary";
  }

  /**
   * Push a TaskFormPage
   *
   * @return void
   */
  addTask() {
    let nav = this.app.getActiveNav();
    nav.push('TaskFormPage', { user: this.user })
  }

  /**
   * Back dates value to initial value
   *
   * @return void
   */
  recovery() {
    this.dates = this.backup;
  }

  /**
   * Search tasks on predefined period
   *
   * @param  event period
   * @return       void
   */
  search(event: any) {
    this.recovery();

    if (event == "today") {
      this.dates = this.dates.filter((d) => { return d == this.today; })
    } else if (event == "tomorrow") {
      this.dates = this.dates.filter((d) => { return d == this.tomorrow; })
    } else if (event == "next7") {
      this.dates = this.dates.filter((d) => {
        return moment(d).isBetween(this.today, moment(this.today).add(7, 'day').format('YYYY-MM-DD'), null, '[]');
      })
    } else if (event == "month") {
      let YM = moment(this.today).format('YYYY-MM');
      let lD = YM + "-" + moment(YM, "YYYY-MM").daysInMonth();
      let fD = YM + "-01";
      this.dates = this.dates.filter((d) => { return moment(d).isBetween(fD, lD, null, '[]'); })
    } else if (event == "nextMonth") {
      let YM = moment(moment(this.today).format('YYYY-MM')).add(1, 'month').format('YYYY-MM');
      let lD = YM + "-" + moment(YM, "YYYY-MM").daysInMonth();
      let fD = YM + "-01";
      this.dates = this.dates.filter((d) => { return moment(d).isBetween(fD, lD, null, '[]'); })
    }
  }

  /**
   * returns a period text from date
   *
   * @param  date start date
   * @return      string
   */
  when(date) {
    var text = moment(date).locale('Pt-br').from(this.today);
    if (text == "poucos segundos atrás") text = "hoje";
    if (text == "em um dia") text = "amanhã";

    return text.charAt(0).toUpperCase() + text.slice(1);
  }

}
