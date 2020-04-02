import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AuthenticationService } from './authentication.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  monthArr: any = [];
  allMonths: any = [];
  monthNames: any = ["January", "February", "March", "April", "May", "June", "July", "August", "Septembar", "Octobar", "Novembar", "Decembar"];

  /**
   * @constructor{{DI will be pushed here}}
   */
  constructor(
    private authServ: AuthenticationService,
    private dataServ: DataService
  ) { }

  /**
   * @function{{generateDate}}
   * @description{{generate month aray}}
   */
  generateDate(monthYear, allEvents) {
    var week = [];
    var month = [];
    console.log(monthYear);
    let str = monthYear.split("-");
    // console.log(str);
    var lastDay = moment(`${str[1]}-${str[0]}`, "YYYY-MM").daysInMonth();
    // console.log(lastDay);

    for (let i = 1; i <= lastDay; i++) {
      // console.log(this.getDayOfWeek(`${str[0]}-${i}-${str[1]}`));

      var count = this.getDayOfWeek(`${str[0]}-${i}-${str[1]}`);
      let obj = {};

      if (moment(moment().format('MM-DD-YYYY')).isSame(`${str[0]}-${i}-${str[1]}`)) {
        obj = {
          position: this.getDayOfWeek(`${str[0]}-${i}-${str[1]}`),
          date: `${str[0]}-${i}-${str[1]}`,
          formated: moment(`${str[0]}-${i}-${str[1]}`).format('DD-MM-YYYY'),
          day: i,
          today: 'Y'
        };
      }
      else {
        obj = {
          position: this.getDayOfWeek(`${str[0]}-${i}-${str[1]}`),
          date: `${str[0]}-${i}-${str[1]}`,
          formated: moment(`${str[0]}-${i}-${str[1]}`).format('DD-MM-YYYY'),
          day: i
        };
      }

      for (let n = 0; n < allEvents.length; n++) {
        if (moment(moment(`${allEvents[n].date}`).format('MM-DD-YYYY')).isSame(`${moment(`${str[0]}-${i}-${str[1]}`).format('MM-DD-YYYY')}`)) {
          obj = { ...obj, event: allEvents[n] };
        }
      }
      week[this.getDayOfWeek(`${str[0]}-${i}-${str[1]}`)] = obj;
      count++;
      if (this.getDayOfWeek(`${str[0]}-${i}-${str[1]}`) == 6) {
        month.push(week);
        week = [];
      }
      if (i == lastDay) {
        month.push(week);
      }
    }

    while (month[month.length - 1].length < 7) {
      month[month.length - 1].push([]);
    }

    this.monthArr = month;

    var monthObj = {
      monthName: `${this.monthNames[parseInt(`${str[0]}`) - 1]}, ${str[1]}`,
      monthArr: month,
    };

    return monthObj;
  }

  /**
   * @function{{getTodayDate}}
   * @description{{get today date and week}}
   */
  getTodayDate() {
    var event;
    this.authServ.getEvent(this.authServ.authState.uid).subscribe(
      (data) => {
        event = data;
        var monthDate = this.generateDate(moment().format('MM-YYYY'), event);
        var a;
        var b;
        for (let i = 0; i < monthDate.monthArr.length; i++) {
          for (let j = 0; j < monthDate.monthArr[i].length; j++) {
            if (monthDate.monthArr[i][j]) {
              if (monthDate.monthArr[i][j].today) {
                a = i;
                b = j;
                break;
              }
            }
          }
        }
        localStorage.setItem('day', JSON.stringify(monthDate.monthArr[a][b]));
        localStorage.setItem('week', JSON.stringify(monthDate.monthArr[a]));
        this.dataServ.changeDay(monthDate.monthArr[a][b]);
        this.dataServ.changeWeek(monthDate.monthArr[a]);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * @function{{getDayOfWeek}}
   * @description{{get day of the week}}
   */
  getDayOfWeek(date) {
    return new Date(`${date}`).getDay();
  }

}
