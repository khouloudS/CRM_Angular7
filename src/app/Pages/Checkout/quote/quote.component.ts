import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmbryoService} from '../../../Services/Embryo.service';
import {Router} from '@angular/router';
import {QuoteService} from '../../../Services/quote.service';

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit , AfterViewInit{

  step = 0;
  isDisabledPaymentStepTwo  = true;
  isDisabledPaymentStepThree = false;
  emailPattern        : any = /\S+@\S+\.\S+/;

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
  listUser: any;
  ID :number;
  Adresse :string;
  CIN:number;
  DateBirth:string;
  Email:string;
  Nom: string;
  Password: string;
  Prenom: string;
  Username: string;
  Operateur: string;
  constructor(public embryoService : EmbryoService,
              private formGroup : FormBuilder,
              public router: Router,
              public  _quoteService: QuoteService) {

    this.embryoService.removeBuyProducts();

  }

  ngOnInit() {
    let item = JSON.parse(localStorage.getItem(this.embryoService.currentUser));

    this._quoteService.loginUser(item).subscribe(data => {
      for(let i of this.listUser = data){
        console.log(this.listUser[0]['id']);
        this.Email = this.listUser[0]['email'];
        this.Nom = this.listUser[0]['nom'];
        this.Prenom = this.listUser[0]['prenom'];
        this.Adresse = this.listUser[0]['adresse'];
        this.CIN = this.listUser[0]['cin'];



        // console.log(this.Email);


    this.paymentFormOne = this.formGroup.group({
      user_details       : this.formGroup.group({
        first_name         : [this.Prenom, [Validators.required]],
        last_name          : [this.Nom, [Validators.required]],
        street_name_number : ['', [Validators.required]],
        apt                : ['', [Validators.required]],
        zip_code           : ['', [Validators.required]],
        city_state         : [this.Adresse, [Validators.required]],
        country            : ['Tunisie', [Validators.required]],
        mobile             : ['', [Validators.required]],
        email              : [this.Email, [Validators.required, Validators.pattern(this.emailPattern)]],
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
    } );
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
    let total = 0;
    if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
      for(let product of this.embryoService.localStorageCartProducts) {
        if(!product.quantity){
          product.quantity = 1;
        }
        total += (product.price*product.quantity);
      }
      total += (this.embryoService.shipping+this.embryoService.tax);
      return total;
    }
    return total;
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



  public finalStep() {

    let paymentGroup = <FormGroup>(this.paymentFormOne.controls['user_details']);
    if(paymentGroup.valid) {
      this.embryoService.addBuyUserDetails(this.paymentFormOne.value);
      this.router.navigate(['/checkout/quote-receipt']);
    } else {
      for (let i in paymentGroup.controls) {
        paymentGroup.controls[i].markAsTouched();
      }
    }
  }
}
