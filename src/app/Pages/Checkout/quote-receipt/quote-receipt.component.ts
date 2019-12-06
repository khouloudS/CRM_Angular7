import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';
import {Quote} from '@angular/compiler';
import {QuoteService} from '../../../Services/quote.service';
import {postData, quoteClientAffect, respData, respquoteClientAffect} from '../../../Model/Quote';
import {postDataQuoteDetails, respDataQuoteDetails} from '../../../Model/QuoteDetails';
import {postInvoiceModel, respInvoiceModel} from '../../../Model/Invoice';

declare var $: any;

@Component({
  selector: 'app-quote-receipt',
  templateUrl: './quote-receipt.component.html',
  styleUrls: ['./quote-receipt.component.css']
})
export class QuoteReceiptComponent implements OnInit {

  deliveryDate: any;
  products: any;
  userDetails: any;
  todayDate: any = new Date();
  quoteReference: any;

  idProduct: [];
  quantity: [];
  posData: postData;
  resultData: respData;
  postInvoice :  postDataQuoteDetails;
  resultQuoteDetails: respDataQuoteDetails;
  affectQuoteUser: quoteClientAffect;
  resultaffectQuoteClient: respquoteClientAffect;
  constructor(public embryoService: EmbryoService, public router: Router, private dataService: QuoteService) {
    this.getDeliveryDate();
    this.userDetails = JSON.parse(localStorage.getItem("user"));
   this.randomString(10);
   console.log(this.randomString(10));

  }

  ngOnInit() {

  }

  public getDeliveryDate() {
    this.deliveryDate = new Date();
    this.deliveryDate.setDate(this.deliveryDate.getDate() + 5);
  }

  public calculateProductSinglePrice(product:any, value: any) {
    let price = 0;
    if(!value) {
      value = 1;
    }
    price = product.price * value;
    return price;
  }

  public calculateTotalPrice() {
    let subtotal = 0;

    if(this.embryoService.buyUserCartProducts && this.embryoService.buyUserCartProducts.length>0) {
      for(let product of this.embryoService.buyUserCartProducts) {
        if(!product.quantity){
          product.quantity = 1;
        }
        subtotal += (product.price * product.quantity) ;
      }
      return subtotal;
    }

    return subtotal;
  }

  public getTotalPrice() {
    let total = 0;
    if(this.embryoService.buyUserCartProducts && this.embryoService.buyUserCartProducts.length>0) {
      for(let product of this.embryoService.buyUserCartProducts) {
        if(!product.quantity){
          product.quantity = 1;
        }
        total += (product.price * product.quantity);
      }
      total += (this.embryoService.shipping+ this.embryoService.tax);
      return total;
    }
    return total;
  }

  public goToHome() {
    this.embryoService.removeBuyProducts();
    this.router.navigate(['/']);
  }

  public printDiv()
  {
    var printContents = $( $('#payment-receipt').html() );
    var originalContents = $('body > *').hide();
    $('body').append( printContents );
    window.print();
    printContents.remove();
    originalContents.show();
    this.sendData();
  }
  private randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.quoteReference = result;
    return result;
  }
  sendData() {
    let item = JSON.parse(localStorage.getItem(this.embryoService.currentUser));

    this.posData = new postData();
    this.posData.description = 'devis orange';
    this.posData.duration = 5;
    this.posData.reference = this.quoteReference;
    this.dataService.addPost(this.posData).subscribe((res: respData) => {
      this.resultData = res;
      console.log(this.resultData.id);
      this.affectQuote(this.resultData.id)
      this.quoteDetails(this.resultData.id);
    });
  }
  affectQuote(idQuote)
  {
    let item = JSON.parse(localStorage.getItem(this.embryoService.currentUser));

    this.affectQuoteUser = new class implements quoteClientAffect {
      id: number;
      idClient: number;
    }
     this.affectQuoteUser.id = idQuote;
     this.affectQuoteUser.idClient = item;
    this.dataService.affectQuoteToClient(idQuote, item, this.affectQuoteUser).subscribe((res: respquoteClientAffect) => {
      this.resultaffectQuoteClient = res;
    });
  }
  quoteDetails(idQuotes)
  {
    if (this.embryoService.buyUserCartProducts && this.embryoService.buyUserCartProducts.length > 0) {
      for (let product of this.embryoService.buyUserCartProducts) {
        if (!product.quantity) {
          product.quantity = 1;
        }
        this.postInvoice = new postDataQuoteDetails();
        this.postInvoice.quoteId = idQuotes;
        this.postInvoice.productId = product.id;
        this.postInvoice.productId = product.quantity;
        this.dataService.postQuoteDetails(product.id, idQuotes, product.quantity, this.postInvoice).subscribe((res: respDataQuoteDetails) => {
          this.resultQuoteDetails = res;
        });
      }
    }
  }

}
