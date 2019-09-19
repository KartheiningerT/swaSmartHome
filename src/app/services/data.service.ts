import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IData } from '../interfaces/IData';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  dataPromise: Promise<IData>;
  constructor(public http: HttpClient) {
    this.dataPromise = this.http.get<IData>('assets/data.json').toPromise();
  }

  async getByDate(filterDate: string) {
    const data = await this.dataPromise;
    const dayData = data.dates.find((value) => {
      return value.date.includes(filterDate.split('.')[0]);
    });
    return dayData;
  }

  public generateLabels(dayView: boolean) {
    if (!dayView) {
      return Array.from(
        { length: moment().daysInMonth() },
        (v, k) => k + 1
      ).map(n => n.toString());
    } else {
      return this.getTimeIntervals(96);
    }
  }

  public getQuartersPassed() {
    const start = moment('00:00', 'HH:mm');
    const difference = moment.duration(moment().diff(start)).asMinutes();
    return Math.floor(difference / 15);
  }

  private getTimeIntervals(quartersPassed) {
    return Array.from(
      { length: quartersPassed },
      (v, i) => 0 ).map(((acc) => () => acc += 15)(-15)).map((n) => moment('00:00', 'HH:mm').add(n, 'minute').format('HH:mm'));
  }
}
