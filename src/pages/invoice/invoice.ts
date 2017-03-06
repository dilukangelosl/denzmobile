import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController , ModalController, LoadingController} from 'ionic-angular';
import {Api} from '../../providers/api';
import {DeliverallPage} from '../deliverall/deliverall';
import {MapPage} from '../map/map';
/*
  Generated class for the Invoice page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
  providers:[Api]
})
export class InvoicePage {
  id:any;
  products:any;
  invoice:any;
  loader:any = false;
  type:any;
  show:boolean ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:Api, public alertCtrl:AlertController, public modalCtrl:ModalController,public loadingCtrl: LoadingController) {

   this.id = this.navParams.get("id");
   this.type = this.navParams.get("type");


   if(this.type == 0 ){

     this.show = true ;
   }
   else {

     this.show= false;
   }
   this.products =  this.api.getInvoice(this.id).then((res) => {


     if(res["result"].length > 1){
       this.products = res["result"];
       this.invoice = this.products[0];
       this.loader = true;
     }
     else {
       navCtrl.pop();
     }


/*

     */


   })

  }



  viewLocation(){

    let loading = this.loadingCtrl.create({
      content: 'Checking for invoice Location, Please wait...'
    });

    loading.present();

    this.api.viewlocation(this.id).then((res) => {

      if(res["result"].length > 0){
console.log(res["result"]);
        //open location
        loading.dismiss();

        this.navCtrl.push(MapPage,{data:res["result"]});


      }
      else {

        //alert
        loading.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Sorry',
          subTitle: 'Invoice doesnt have a Location',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    })


  }

  round(num:any){
    return Math.round(parseInt(num));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePage');
  }


  showConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Confirm Delivery',
      message: 'Please confirm the Delivery',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Confirm',
          handler: () => {
      this.openModal();
          }
        }
      ]
    });
    confirm.present();
  }


  openModal(){
    let profileModal = this.modalCtrl.create(DeliverallPage, { id: this.id });

    profileModal.onDidDismiss(data => {
      if(data.status == 400){
        console.log("normal close")
      }
      else {
        this.navCtrl.pop();
      }
    });


    profileModal.present();
  }

}
