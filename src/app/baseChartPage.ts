import { Color, Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import * as moment from 'moment';
import { DataService } from './services/data.service';

export class BaseChartPage {
  public lineChartColors: Color[] = [
    {
      backgroundColor: '#00aeef',
      borderColor: '#a7cae4',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  public lineChartData: ChartDataSets[] = null;
  public lineChartLabels: Label[] = [];
  public dayView = true;
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      xAxes: [{
        display: true,
        id: 'x-axis-0',
        scaleLabel: {
          display: true,
          labelString: 'Zeit'
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
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-0',
          value: '300',
          borderColor: '#f34f57',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: '#f34f57',
            content: 'Schwellenwert'
          }
        }
      ]
    }
  };

  constructor(public dataService: DataService) {
  }

  async init() {
    const data = await this.getData();
    this.lineChartData = [
      {
        data: data.splice(0, this.dataService.getQuartersPassed()),
        label: 'Watt'
      }
    ];

    this.lineChartLabels = this.dataService.generateLabels(this.dayView);
  }

  public async getData(date?: string) {
    if (!date) {
      date = moment().format('DD.MM.YYYY');
    } else {
      date = moment(date).format('DD.MM.YYYY');
    }
    const consumptionDay = await this.dataService.getByDate(date);
    return consumptionDay.consumptions.map((consumpiton) => consumpiton.watt);
  }
}
