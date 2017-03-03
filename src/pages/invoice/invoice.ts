import { Component } from '@angular/core';
import { NavController, NavParams ,AlertController , ModalController} from 'ionic-angular';
import {Api} from '../../providers/api';
import {DeliverallPage} from '../deliverall/deliverall'
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:Api, public alertCtrl:AlertController, public modalCtrl:ModalController) {

   this.id = this.navParams.get("id");


   this.products =  this.api.getInvoice(this.id).then((res) => {



     this.products = res["result"];
     this.invoice = this.products[0];
     this.loader = true;

     console.log(this.invoice);
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
