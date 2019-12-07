import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import { EmbryoService } from '../../../Services/Embryo.service';
import {QuoteService} from '../../../Services/quote.service';

declare var $: any;

@Component({
  selector: 'app-FinalReceipt',
  templateUrl: './FinalReceipt.component.html',
  styleUrls: ['./FinalReceipt.component.scss']
})
export class FinalReceiptComponent implements OnInit {
  qrcodename : string;
  title = 'generate-qrcode';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string;
  display = false;
  href : string;

  parentRouteParams: string;

   deliveryDate : any;
   products     : any;
   userDetails  : any;
   todayDate    : any = new Date();

   constructor(public embryoService: EmbryoService, public router: Router,
               private dataService: QuoteService,
               private route: ActivatedRoute) {
     this.parentRouteParams = this.route.snapshot.paramMap.get('reference');
      this.getDeliveryDate();
      this.userDetails = JSON.parse(localStorage.getItem("user"));
     this.value = 'Cette facture de référence ' + this.parentRouteParams + ' est payée d un montant ' + this.getTotalPrice() +'$';
     this.display = true;
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
   }
}
