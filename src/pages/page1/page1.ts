import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {Api} from '../../providers/api';
import {Page2} from '../page2/page2';


@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers:[Api]
})
export class Page1 {


  vehicles:any ;
  loader:boolean =  true ;


  constructor(public navCtrl: NavController, public myapi:Api) {



      this.myapi.getVehicles().then((res) => {


        console.log(res);
        this.vehicles = res["result"];
        this.loader = false ;

      })


  }

  getVehicles(refresher:any){
    this.vehicles = [];

    this.myapi.getVehicles().then((res) => {


      console.log(res);
      this.vehicles = res["result"];
      refresher.complete();

    })


  }

  gotoinvoice(id:any)
  {
    this.navCtrl.push(Page2, {id:id});
  }
}
