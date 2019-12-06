import { Component, OnInit } from '@angular/core';
import {postData} from '../../../Model/Quote';
import {QuoteService} from '../../../Services/quote.service';
import {Router} from '@angular/router';
import {EmbryoService} from '../../../Services/Embryo.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.css']
})
export class InvoiceHistoryComponent implements OnInit {

  deliveryDate: any;
  public quote :any;
  displayedColumns: string[] = [ 'orderid', 'name', 'price', 'status','position','action'];
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

    this._quoteService.getQuote().subscribe(data => {
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
