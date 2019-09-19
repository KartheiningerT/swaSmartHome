import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import * as _ from 'lodash';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-power-profile-create',
  templateUrl: './power-profile-create.page.html',
  styleUrls: ['./power-profile-create.page.scss'],
})
export class PowerProfileCreatePage implements OnInit {
  public name: string;
  public pickerOptions: any;
  public selectedDate: string;
  public maxDate: string;
  public data;

  constructor(private navCtrl: NavController, private profileService: ProfileService, private dataService: DataService) {
    this.pickerOptions = {
      buttons: [
        {
          text: 'Auswählen',
          handler: () => this.selectionChanged()
        },
        {
          text: 'Abbrechen',
          handler: () => {}
        }
      ]
    };

    this.selectedDate = moment().toISOString();
    this.maxDate = moment().toISOString();
    this.data = this.dataService.generateLabels(true).map((l) => [l, Math.round(Math.random() * (10 - 0) + 0)]);
  }

  ngOnInit() {
  }

  selectionChanged() {

  }

  public save() {
    this.profileService.add({ name: this.name });
    this.navCtrl.navigateBack(`/power-profile`);
  }
}
