import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Events, AlertController } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import 'leaflet';
import 'leaflet.gridlayer.googlemutant'
import 'leaflet.markercluster';
import { ShopService } from '../../service/shop.service';
import { AboutPage } from '../about/about';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ShopService],
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  shop: any;
  markers: any;
  category: any;
  points: any;

  constructor(public navCtrl: NavController, public events: Events, private shopService: ShopService, public alertCtrl: AlertController) {
    this.loadMap();
    this.shopService.getPoints().subscribe((data) => {
      this.points = data;
    });
  }

  loadMap() {
    Geolocation.getCurrentPosition().then((position) => {
      this.map = new L.Map('map', {center: new L.LatLng(position.coords.latitude, position.coords.longitude), zoom: 17});
      this.displayMap();
    }, (err) => {
      console.log(err);
      this.map = new L.Map('map', {center: new L.LatLng(35.684423, 139.743358), zoom: 16});
      this.displayMap();
    });
  }

  displayMap() {
    L.gridLayer.googleMutant({
      maxZoom: 24,
      type:'roadmap'
    }).addTo(this.map);

    this.markers = L.markerClusterGroup();

    this.shopService.getShops().subscribe((data) => {
      this.addMarker(data);
    });
  }

  addMarker(data) {
    for (var i = 0; i < data.length; i++) {
      let shop = data[i];
      let name = shop['name'];
      let marker = L.marker(new L.LatLng(shop['latitude'], shop['longitude']), { title: name, alt: `${i}` });
      marker.on('click', (select) => {
        let no = select.target.options.alt;
        this.shop = data[no];
      });
      this.markers.addLayer(marker);
    }

    this.map.addLayer(this.markers);
  }

  goToDetail(id) {
    this.navCtrl.push(AboutPage, id);
  }

  addTab(id, name) {
    this.events.publish('add:shop', id, name, AboutPage);
  }

  showCategoryRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('食べたい料理は？');

    let categoryList = ['ラーメン', 'イタリアン', 'カレー', '中華料理', '寿司', 'カフェ', '和食', '日本料理', 'そば', 'うどん', 'とんかつ', 'パスタ'];
    for (var i = 0; i < categoryList.length; i++) {
      alert.addInput({
        type: 'radio',
        label: categoryList[i],
        value: `${i}`,
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Search',
      handler: data => {
        this.markers.clearLayers();
        this.shopService.searchCategory(data).subscribe((data) => {
          this.addMarker(data);
        });
      }
    });
    alert.present();
  }

  showPointRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('おすすめポイント');

    let data = this.points;
    for (var i = 0; i < data.length; i++) {
      alert.addInput({
        type: 'radio',
        label: data[i].name,
        value: data[i].id,
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Search',
      handler: data => {
        this.category = data;
        this.markers.clearLayers();
        this.shopService.searchPoint(data).subscribe((data) => {
          this.addMarker(data);
        });
      }
    });
    alert.present();
  }
}
