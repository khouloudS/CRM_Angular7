import { Component, OnInit } from '@angular/core';
import {QuoteService} from '../../../Services/quote.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {EmbryoService} from '../../../Services/Embryo.service';
import {Quote} from '@angular/compiler';
import {postData} from '../../../Model/Quote';

const order_history = [
   {position: 1, orderid:1801, name: 'LEGITIM', price: 1.0079, status: 'Sent',action:''},
   {position: 2, orderid:1832, name: 'GRUNDTAL', price: 4.0026, status: 'In processing',action:''},
   {position: 3, orderid:1881, name: 'BOHOLMEN', price: 6.941, status: 'Sent',action:''},
   {position: 4, orderid:1832, name: 'ROSTAD LÖK', price: 9.0122, status: 'Return',action:''},
   {position: 5, orderid:1810, name: 'TÅRTA CHOKLADKROKANT', price: 10.811, status: 'Sent',action:''},
];

@Component({
  selector: 'app-OrderHistory',
  templateUrl: './OrderHistory.component.html',
  styleUrls: ['./OrderHistory.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  deliveryDate: any;
  public quote :any;
   displayedColumns: string[] = [ 'orderid', 'name', 'price', 'status','position','action'];
   dataSource = order_history;
  genereted = 'généré';
  nongenereted = 'non généré';
  ratingInfoList: { book: postData; rating: number }[] = [];
  expiredDate = [];

  constructor(private _quoteService: QuoteService,  public router: Router, public embryoService: EmbryoService,
               private formGroup : FormBuilder) {
    localStorage.removeItem("cart_item");
  }

   ngOnInit() {
    // this._quoteService.getQuote().subscribe(data => this.quote = data );

     let item = JSON.parse(localStorage.getItem(this.embryoService.currentUser));

     this._quoteService.getQuoteByClient(item).subscribe(data => {
       this.deliveryDate = new Date();
       for (let i of this.quote = data){
         this.deliveryDate.setDate(this.quote.dateQuote + this.quote.duation);
         console.log(this.quote.dateQuote);
         this.expiredDate.push({
           'idRef': this.quote.reference,
           'dateExpired': this.deliveryDate
         });
       }
     });
   }

  onRate({book, rating}: { book: postData; rating: number }) {

    const ratingInfo = {
      book,
      rating
    };

    this.ratingInfoList = [...this.ratingInfoList, ratingInfo];

  }
  public getDeliveryDate() {
    this.deliveryDate = new Date();
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 5);
  }
  public finalStep(reference) {

     // this.embryoService.addBuyUserDetails(this.paymentFormOne.value);
      this.router.navigate(['/account/quote-history']);
  }

}
