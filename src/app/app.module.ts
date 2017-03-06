import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {Api} from  '../providers/api'
import {InvoicePage} from '../pages/invoice/invoice';
import  {DeliverallPage} from '../pages/deliverall/deliverall';
import {SearchPage} from '../pages/search/search';
import {MapPage} from '../pages/map/map'

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    InvoicePage,
    DeliverallPage,
    SearchPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    InvoicePage,
    DeliverallPage,
    SearchPage,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Api]
})
export class AppModule {}
