import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [ShopService],
})
export class AboutPage {
  shop: any;

  constructor(public navCtrl: NavController, navParams: NavParams, private shopService: ShopService) {
    this.getDetail(navParams.data);
  }

  getDetail(id) {
    this.shopService.get(id).subscribe((data) => {
      this.shop = data;
    });
  }
}
