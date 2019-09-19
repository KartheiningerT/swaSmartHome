import { Component, OnInit } from '@angular/core';
import { BaseChartPage } from '../baseChartPage';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { DataService } from '../services/data.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-power-profile-detail',
  templateUrl: './power-profile-detail.page.html',
  styleUrls: ['./power-profile-detail.page.scss'],
})
export class PowerProfileDetailPage extends BaseChartPage implements OnInit {
  public title: string;
  public peak: string;
  public duration: string;
  public total: string;
  constructor(private route: ActivatedRoute, dataService: DataService, private profileService: ProfileService) {
    super(dataService);
    this.lineChartOptions.annotation = null;
  }

  async ngOnInit() {
    this.route.paramMap.subscribe((params) => this.title = params.get('name'));
    const data = this.profileService.getByName(this.title).values;
    this.lineChartLabels = data.map((d) => d[0].toString());
    this.lineChartData = [ { data: data.map((d) => d[1]) }];
    this.peak = _.max(this.lineChartData[0].data) + ' kw/h';
    this.duration = _.last(this.lineChartLabels) + ' min';
    this.total = Math.trunc(_.sum(this.lineChartData[0].data)) + ' kw/h';
  }
}
