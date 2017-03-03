import { Component } from '@angular/core';
import { NavController, NavParams , ViewController, AlertController, LoadingController} from 'ionic-angular';
import {
  Geolocation
} from 'ionic-native';
import {Api} from '../../providers/api';

/*
  Generated class for the Deliverall page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-deliverall',
  templateUrl: 'deliverall.html',
  providers:[Api]
})
export class DeliverallPage {

  lat:any = null;
  lng:any = null;
  loader:any = true ;


  //var

  endmilage:any;
  charges:any;
  discounts:any;
  transportcharges:any;
  paidamount:any;
  error:any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl:ViewController , public alertCtrl:AlertController, public api:Api, public loadingCtrl:LoadingController) {

console.log(this.navParams.get("id"));

  }

  close(){

    this.viewCtrl.dismiss({status:400});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliverallPage');
  }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.getLocation();
  }


  getLocation(){
    this.loader = true ;
    Geolocation.getCurrentPosition().then((resp) => {
      this.lat =  resp.coords.latitude
      this.lng = resp.coords.longitude
      this.loader= false;
      this.error = false;
     console.log(this.lat + " " + this.lng);
    }).catch((error) => {
      console.log('Error getting location', error);
      this.error = true;
      this.loader= false;
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Cannot Get your GPS Location , Please Check GPS Settings',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }

  update(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();



    if(!this.error){
    this.api.finishtransport(this.navParams.get("id"), this.endmilage, this.charges, this.discounts, this.paidamount).then((res) => {

      console.log(res);
      this.api.addlocation(this.navParams.get("id"),this.lat, this.lng).then((res) => {
        console.log(res);
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Success',
          subTitle: 'Delivery Completed',
          buttons: ['Dismiss']
        });
        alert.present();

        this.viewCtrl.dismiss({status:200});
      });


    })
  }
  else {

      loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Couldnt Get the Gps Location, Please Refresh Location',
      buttons: ['Dismiss']
    });
    alert.present();
  }




  }


/*
  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map = new GoogleMap(element);

    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

      // create LatLng object
      let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(this.lat,this.lng);

      // create CameraPosition
      let position: CameraPosition = {
        target: ionic,
        zoom: 18,
        tilt: 30
      };

      // move the map's camera to position
      map.moveCamera(position);

      // create new marker
      let markerOptions: GoogleMapsMarkerOptions = {
        position: ionic,
        title: 'Ionic'
      };

      map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
          marker.showInfoWindow();
        });


    })
  };

*/

}
