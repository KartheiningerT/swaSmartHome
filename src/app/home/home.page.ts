import { Component } from '@angular/core';
import { BaseChartPage } from '../baseChartPage';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage extends BaseChartPage {

  constructor(dataSerVice: DataService) {
    super(dataSerVice);
    this.init();
  }
}
