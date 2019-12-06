import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { EmbryoService } from '../../../Services/Embryo.service';
import {Router, NavigationEnd, ActivatedRoute} from '@angular/router';
import {QuoteService} from '../../../Services/quote.service';
import {postData, respData} from '../../../Model/Quote';
import {postInvoiceModel, respInvoiceModel} from '../../../Model/Invoice';
import {postPayment, respPayment} from '../../../Model/Payment';

@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit{
  parentRouteParams: string;
  postInvoice: postInvoiceModel;
  resultData: respInvoiceModel;
  postPayment: postPayment;
  respPayment: respPayment;
  total: number;
  invoiceReference : string;
   step = 0;
   isDisabledPaymentStepTwo  = true;
   isDisabledPaymentStepThree = false;
   emailPattern: any = /\S+@\S+\.\S+/;
   offerCards : any = [
      {
         id: 1,
         name:"Debit Card",
         content: "Visa Mega Shopping Offer"
      },
      {
         id: 2,
         name:"Credit Card",
         content: "American Express 20% Flat"
      },
      {
         id: 3,
         name:"Debit Card",
         content: "BOA Buy 1 Get One Offer"
      },
      {
         id: 4,
         name:"Master Card",
         content: "Mastercard Elite Card"
      },
      {
         id: 5,
         name:"Debit Card",
         content: "Visa Mega Shopping Offer"
      }
   ]

   bankCardsImages : any = [
      {
         id:1,
         image:"assets/images/client-logo-1.png"
      },
      {
         id:2,
         image:"assets/images/client-logo-2.png"
      },
      {
         id:3,
         image:"assets/images/client-logo-3.png"
      },
      {
         id:4,
         image:"assets/images/client-logo-4.png"
      },
      {
         id:5,
         image:"assets/images/client-logo-5.png"
      }
   ]

   paymentFormOne   : FormGroup;

   constructor(public embryoService : EmbryoService,
               private formGroup : FormBuilder,
               public router: Router,
               private dataService: QuoteService,
               private route: ActivatedRoute) {

      this.embryoService.removeBuyProducts();
     this.randomString(10);
   }

   ngOnInit() {
     this.parentRouteParams = this.route.snapshot.paramMap.get('reference');
      this.paymentFormOne = this.formGroup.group({
         user_details       : this.formGroup.group({
            first_name         : ['', [Validators.required]],
            last_name          : ['', [Validators.required]],
            street_name_number : ['', [Validators.required]],
            apt                : ['', [Validators.required]],
            zip_code           : ['', [Validators.required]],
            city_state         : ['', [Validators.required]],
            country            : ['', [Validators.required]],
            mobile             : ['', [Validators.required]],
            email              : ['', [Validators.required, Validators.pattern(this.emailPattern)]],
            share_email        : ['', [Validators.pattern(this.emailPattern)]],
         }),
         offers             : this.formGroup.group({
            discount_code   : [''],
            card_type       : [1],
            card_type_offer_name  : [null]
         }),
         payment            : this.formGroup.group({
            card_number     : ['', [Validators.required]],
            user_card_name  : ['', [Validators.required]],
            cvv             : ['', [Validators.required]],
            expiry_date     : ['', [Validators.required]],
            card_id         : [1],
            bank_card_value : [null]
         })
      });
   }

   ngAfterViewInit() {
   }

   public setStep(index: number) {
      this.step = index;
      switch (index) {
         case 0:
            this.isDisabledPaymentStepTwo = true;
            this.isDisabledPaymentStepThree = true;
            break;
         case 1:
            this.isDisabledPaymentStepThree = false;
            break;
         default:

            break;
      }
   }

   public toggleRightSidenav() {
      this.embryoService.paymentSidenavOpen = !this.embryoService.paymentSidenavOpen;
   }

   public getCartProducts() {

      if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
         for(let product of this.embryoService.localStorageCartProducts) {
            if(!product.quantity){
               product.quantity = 1;
            }
            this.total += (product.price*product.quantity);
         }
         this.total += (this.embryoService.shipping+this.embryoService.tax);
         return this.total;
      }
      return this.total;
   }

   public submitPayment() {
      let userDetailsGroup = <FormGroup>(this.paymentFormOne.controls['user_details']);
      if(userDetailsGroup.valid)
      {
         switch (this.step) {
            case 0:
               this.step = 1;
               this.isDisabledPaymentStepTwo = false;
               break;
            case 1:
               this.step = 2;
               break;

            default:
               // code...
               break;
         }

      } else {
         this.isDisabledPaymentStepTwo = true;
         this.isDisabledPaymentStepThree = true;
         for (let i in userDetailsGroup.controls) {
            userDetailsGroup.controls[i].markAsTouched();
         }
      }
   }

   public selectedPaymentTabChange(value) {
      let paymentGroup = <FormGroup>(this.paymentFormOne.controls['payment']);

      paymentGroup.markAsUntouched();

      if(value && value.index == 1) {
            paymentGroup.controls['card_number'].clearValidators();
            paymentGroup.controls['user_card_name'].clearValidators();
            paymentGroup.controls['cvv'].clearValidators();
            paymentGroup.controls['expiry_date'].clearValidators();

            paymentGroup.controls['bank_card_value'].setValidators([Validators.required]);
      } else {

         paymentGroup.controls['card_number'].setValidators([Validators.required]);
         paymentGroup.controls['user_card_name'].setValidators([Validators.required]);
         paymentGroup.controls['cvv'].setValidators([Validators.required]);
         paymentGroup.controls['expiry_date'].setValidators([Validators.required]);

         paymentGroup.controls['bank_card_value'].clearValidators();
      }

      paymentGroup.controls['card_number'].updateValueAndValidity();
      paymentGroup.controls['user_card_name'].updateValueAndValidity();
      paymentGroup.controls['cvv'].updateValueAndValidity();
      paymentGroup.controls['expiry_date'].updateValueAndValidity();
      paymentGroup.controls['bank_card_value'].updateValueAndValidity();
   }

  private randomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.invoiceReference = result;
    return result;
  }

   public  generateInvoice()
   {
     this.postInvoice = new postInvoiceModel();
     this.postInvoice.reference = this.invoiceReference;
     this.postInvoice.total = this.total;
     this.dataService.addInvoice(this.parentRouteParams, this.postInvoice).subscribe((res: respInvoiceModel) => {
       this.resultData = res;
     });

   }
  public doPayment()
  {
    console.log(this.invoiceReference);
  this.postPayment = new postPayment();
  this.postPayment.amount = this.total;
  this.dataService.doPayment(this.invoiceReference, this.postPayment).subscribe((resp: respPayment ) => {
    this.respPayment = resp;
  });
  }
   public finalStep() {
     this.generateInvoice();
     this.doPayment();
      let paymentGroup = <FormGroup>(this.paymentFormOne.controls['payment']);
      if(paymentGroup.valid) {
         this.embryoService.addBuyUserDetails(this.paymentFormOne.value);
         this.router.navigate(['/checkout/final-receipt', this.invoiceReference]);

      } else {
         for (let i in paymentGroup.controls) {
            paymentGroup.controls[i].markAsTouched();
         }
      }
   }
}



