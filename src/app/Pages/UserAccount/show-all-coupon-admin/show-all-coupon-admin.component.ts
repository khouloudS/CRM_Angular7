import { Component, OnInit } from '@angular/core';
import {postData} from '../../../Model/Quote';
import {QuoteService} from '../../../Services/quote.service';
import {Router} from '@angular/router';
import {EmbryoService} from '../../../Services/Embryo.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-show-all-coupon-admin',
  templateUrl: './show-all-coupon-admin.component.html',
  styleUrls: ['./show-all-coupon-admin.component.css']
})
export class ShowAllCouponAdminComponent implements OnInit {

  public searchText : string;
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

    this._quoteService.getAllCoupon().subscribe(data => {this.quote = data});
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
