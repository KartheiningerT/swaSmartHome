import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-power-profile',
  templateUrl: './power-profile.page.html',
  styleUrls: ['./power-profile.page.scss'],
})
export class PowerProfilePage implements OnInit {
  public profiles = this.profileService.get();
  constructor(private navCtrl: NavController, private profileService: ProfileService) { }

  ngOnInit() {
  }

  public showProfile(profile) {
    this.navCtrl.navigateForward(`/power-profile-detail/${profile.name}`);
  }

  public addProfile() {
    this.navCtrl.navigateForward(`/power-profile-create`);
  }

  public delete(profile) {
    this.profileService.remove(profile);
  }
}
