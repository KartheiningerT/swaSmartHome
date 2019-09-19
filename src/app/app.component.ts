import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Heutiger Tag',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Tagesübersicht',
      url: '/overview',
      param: 'day',
      icon: 'stats'
    },
    {
      title: 'Monatsübersicht',
      url: '/overview',
      param: 'month',
      icon: 'stats'
    },
    {
      title: 'Leistungsprofile',
      url: '/power-profile',
      icon: 'pulse'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  public getRouterLink(p) {
    if (p.param) {
      return [p.url, p.param];
    } else {
      return p.url;
    }
  }
}
