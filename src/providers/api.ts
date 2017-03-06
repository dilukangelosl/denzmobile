import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Api provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Api {


  private apiUrl = "http://45.35.69.19:3000/api/";


  constructor(public http: Http) {

  }



  getVehicles(){

    return new Promise((resolve, reject) => {

      this.http.get(this.apiUrl+"getvehicleno").map(res => res.json()).subscribe(data => {
       resolve(data)
      });

    })

  }


  getInvoices(vehicleno:any){

    return new Promise((resolve,reject) => {

      this.http.post(this.apiUrl+"getinvoices", {id:vehicleno}).map(res => res.json()).subscribe(data => {
        resolve(data)
      });


    })

  }

  getInvoice(invoiceno:any) {

  return new Promise((resolve,reject) => {
    this.http.post(this.apiUrl+"getinvoice", {id:invoiceno}).map(res => res.json()).subscribe(data => {
      resolve(data)
    });
  })
}


  finishtransport(invoiceno:any , endmilage:any,charges:any,discount:any,paidamount:any) {

    return new Promise((resolve,reject) => {
      this.http.post(this.apiUrl+"finishtransport", {invoiceid:invoiceno,endmilage:endmilage, charges:charges,discount:discount,paidamount:paidamount}).map(res => res.json()).subscribe(data => {
        resolve(data)
      });
    })
  }

  finishProduct(productcode:any , status:any,invoiceno:any) {

    return new Promise((resolve,reject) => {
      this.http.post(this.apiUrl+"finishproduct", {productcode:productcode,status:status, invoiceno:invoiceno}).map(res => res.json()).subscribe(data => {
        resolve(data)
      });
    })
  }


  finishinvoice(invoiceno:any , status:any) {

    return new Promise((resolve,reject) => {
      this.http.post(this.apiUrl+"finishinvoice", {invoiceno:invoiceno,status:status}).map(res => res.json()).subscribe(data => {
        resolve(data)
      });
    })
  }


  viewlocation(delid:any) {

    return new Promise((resolve,reject) => {
      this.http.post(this.apiUrl+"viewlocation", {delid:delid}).map(res => res.json()).subscribe(data => {
        resolve(data)
      });
    })
  }

  addlocation(delid:any, lat:any,lng:any) {

    return new Promise((resolve,reject) => {
      this.http.post(this.apiUrl+"addlocation", {delid:delid,lat:lat,lng:lng}).map(res => res.json()).subscribe(data => {
        resolve(data)
      });
    })
  }


}
