import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ShopService } from '../../service/shop.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [ShopService],
})
export class AboutPage {
  id: any;
  shop: any;
  points = [];
  haspoints = [];
  comment: any;
  loader: any;

  constructor(public navCtrl: NavController, navParams: NavParams, private shopService: ShopService, public loadingCtrl: LoadingController) {
    this.presentLoading();
    this.id = navParams.data;
    this.getDetail();
    this.shopService.getPoints().subscribe((data) => {
      this.points = data;
    });
  }

  getDetail() {
    this.haspoints = [];
    this.shopService.getShop(this.id).subscribe((data) => {
      this.shop = data;
      for (var i = 0; i < data.points.length; i++) {
        this.haspoints[data.points[i].point_id] = data.points[i].id;
      }
      this.loader.dismiss();
    });
  }

  changePoints(event, pointId, shopId) {
    this.presentLoading();
    this.shop = undefined;
    let checked = event.checked;

    if (this.haspoints[pointId]) {
      if (!checked) {
        this.shopService.deleteShopPoint(this.haspoints[pointId]).subscribe(() => {
          this.getDetail();
        });
      }
    } else if (checked) {
      this.shopService.postShopPoint(shopId, pointId).subscribe(() => {
        this.getDetail();
      });
    }
  }

  isChecked(pointId) {
    return this.haspoints[pointId];
  }

  addComment(shopId) {
    if (this.comment) {
      this.presentLoading();
      this.shop = undefined;
      this.shopService.postComment(shopId, this.comment).subscribe(() => {
        this.getDetail();
        this.comment = '';
      });
    }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait...",
    });
    this.loader.present();
  }
}
