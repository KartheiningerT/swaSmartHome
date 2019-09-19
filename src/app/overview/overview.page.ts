import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import * as moment from 'moment';
import 'moment/locale/de';
import { ActivatedRoute } from '@angular/router';
import { BaseChartPage } from '../baseChartPage';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss']
})
export class OverviewPage extends BaseChartPage implements OnInit {
  public selectedDate: string;
  public maxDate: string;
  public monthNames = [
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember'
  ];
  public title: string;
  public pickerOptions: any;

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  constructor(route: ActivatedRoute, dataService: DataService) {
    super(dataService);

    this.lineChartOptions = {
      responsive: true,
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Uhrzeit'
          }
        }],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Watt'
            },
            id: 'y-axis-0',
            position: 'left'
          }
        ]
      },
      annotation: {}
    };

    route.paramMap.subscribe((params) => this.dayView = params.get('type') === 'day' ? true : false);

    this.pickerOptions = {
      buttons: [
        {
          text: 'Auswählen',
          handler: (date) => {
            this.selectionChanged(date);
          }
        },
        {
          text: 'Abbrechen',
          handler: () => {}
        }
      ]
    };
  }

  async ngOnInit() {
    this.title = this.dayView ? 'Tagesübersicht' : 'Monatsübersicht';
    this.selectedDate = this.dayView ? moment().subtract(1, 'day').toISOString() :  moment().subtract(1, 'month').toISOString();
    this.maxDate = this.dayView ? moment().subtract(1, 'day').toISOString() :  moment().subtract(1, 'month').toISOString();
    let data = await this.getData();
    data = this.dayView ? data : data.splice(0, moment().daysInMonth());
    this.lineChartData = [
      {
        data,
        label: 'Watt'
      }
    ];
    this.lineChartLabels = this.dataService.generateLabels(this.dayView);
  }

  private async selectionChanged(date) {
    if (!this.dayView) {
      this.lineChartLabels = this.dataService.generateLabels(this.dayView);
    }
    this.lineChartData[0].data = await this.getData(`${date.day.text}.${date.month.text}.${date.year.text}`);
  }
}
