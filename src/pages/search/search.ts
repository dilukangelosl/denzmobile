import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Api} from  '../../providers/api';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import {InvoicePage} from '../invoice/invoice';

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers:[Api]
})
export class SearchPage {

  searchTerm: string = '';
  searchControl: FormControl;
  items: any;
  searching: any = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:Api) {



    this.searchControl = new FormControl();
  }

  search(searchtext){

    this.api.searchinvoice(searchtext).then((res) =>{
      this.searching = false;
      console.log(res);
      this.items = res["result"];
    })
  }


  gotoinvoice(invoiceno:any){

   // console.log("clicked");
    this.navCtrl.push(InvoicePage,{id:invoiceno,type:0});

  }


  onSearchInput(){
    this.searching = true;
  }

  ionViewDidLoad() {



    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {

      this.search(search);

    });


  }

}
