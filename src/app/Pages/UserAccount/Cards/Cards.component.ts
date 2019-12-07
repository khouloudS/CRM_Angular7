import {Component, OnInit} from '@angular/core';
import {QuoteService} from '../../../Services/quote.service';
import {Router} from '@angular/router';
import {EmbryoService} from '../../../Services/Embryo.service';
import {FormBuilder} from '@angular/forms';
import {postData} from '../../../Model/Quote';

// import { EditService, ToolbarService, SelectionService } from '@syncfusion/ej2-angular-grids';
@Component({
  selector: 'app-Cards',
  templateUrl: './Cards.component.html',
  styleUrls: ['./Cards.component.scss']
})
export class CardsComponent implements OnInit {
  deliveryDate: any;
  public quote :any;
  displayedColumns: string[] = [ 'orderid', 'name', 'price', 'status','position','action'];
  genereted = 'généré';
  nongenereted = 'non généré';
  ratingInfoList: { book: postData; rating: number }[] = [];
  expiredDate = [];


  constructor(private _quoteService: QuoteService,  public router: Router, public embryoService: EmbryoService,
              private formGroup : FormBuilder) {

  }
  public ngOnInit(): void {
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

}
