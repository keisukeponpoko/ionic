import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  homeRoot: any = HomePage;

  tabs: any = [];

  constructor(public events: Events) {
    this.events.subscribe('add:shop', (id, title, Root) => {
      let tabNo = this.tabs.push({id: id, title: title, root: Root});
      console.log(tabNo);
    });
  }
}
