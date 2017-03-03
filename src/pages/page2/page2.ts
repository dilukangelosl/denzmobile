import { Component } from '@angular/core';
import {Api} from '../../providers/api';
import { NavController, NavParams } from 'ionic-angular';
import {InvoicePage} from '../invoice/invoice';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers:[Api]
})
export class Page2 {

  invoices:any ;
  loader:boolean = true ;
  id:any ;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:Api) {

    this.id = this.navParams.get("id");

    this.api.getInvoices(this.id).then((res) => {

      console.log(res);
      this.invoices = res["result"];
      this.loader = false ;
    })

  }

  getInvoices(refresher){

    this.api.getInvoices(this.navParams.get("id")).then((res) => {

      this.invoices = res["result"];
      refresher.complete();
    })

  }

  gotoinvoice(invoiceno:any){

    console.log("clicked");
    this.navCtrl.push(InvoicePage,{id:invoiceno});

  }


}
