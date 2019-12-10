import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastaService, ToastOptions} from 'ngx-toasta';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {postData, respData} from '../../../Model/Quote';
import {respDataQuoteDetails} from '../../../Model/QuoteDetails';
import {EmbryoService} from '../../../Services/Embryo.service';
import {QuoteService} from '../../../Services/quote.service';
import {Quote} from '@angular/compiler';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {postProduct} from '../../../Model/Product';
import {productQuantityModel} from '../../../Model/ProductQuatity';
declare var $: any;
@Component({
  selector: 'app-quote-history',
  templateUrl: './quote-history.component.html',
  styleUrls: ['./quote-history.component.css']
})
export class QuoteHistoryComponent implements OnInit {
  index : number;
  products: any;
  quote = [];
  quoteDetails : any;
  productList: any;
  quantity: [];
  object : any;
  parentRouteParams: string;
listQuantity: productQuantityModel;
  quanti : any;
  quantityArray  : number[] = [1,2,3,4,5,6,7,8,9,10];
  popupResponse  : any;
  listUser: any;
  ID: number;
  Adresse: string;
  CIN: number;
  DateBirth: string;
  Email: string;
  Nom: string;
  Password: string;
  Prenom: string;
  Username: string;
  Operateur: string;
  idClient: number;
  generated: number;
  expired: boolean;

  constructor(private _quoteService: QuoteService, public embryoService: EmbryoService,
              public router: Router, private dataService: QuoteService,
              private route: ActivatedRoute,
              private loadingBar: LoadingBarService,
              private cdRef : ChangeDetectorRef,
              private db: AngularFireDatabase,
  ) {



  }


  ngOnInit() {
    this.parentRouteParams = this.route.snapshot.paramMap.get('reference')
   console.log(this.parentRouteParams);
    this._quoteService.getQuoteProduct(this.parentRouteParams).subscribe(data => {
      for( let i of this.quoteDetails = data) {
        this.idClient = this.quoteDetails[0]['idClient'];
        this.generated = this.quoteDetails[0]['generated'];
        this.expired = this.quoteDetails[0]['expired'];
        this._quoteService.loginUser(this.idClient).subscribe(res => {
          for (let i of this.listUser = res) {
            console.log(this.listUser[0]['id']);
            this.Email = this.listUser[0]['email'];
            this.Nom = this.listUser[0]['nom'];
            this.Prenom = this.listUser[0]['prenom'];
            this.Adresse = this.listUser[0]['adresse'];
            this.CIN = this.listUser[0]['cin'];
          }

        });
      }
    });
    let item = JSON.parse(localStorage.getItem(this.embryoService.currentUser));
    this._quoteService.getQuoteByClient(item).subscribe(data => this.quote = data );

    // this._quoteService.getProductByQuote(this.parentRouteParams).subscribe(data => console.log(this.productList = data) );
    this._quoteService.getProductByQuote(this.parentRouteParams).subscribe(data => {
      for (let i of this.productList = data){
        this._quoteService.findAllProductByQuoteAndNumber(i.id, this.parentRouteParams).subscribe(resp => console.warn(this.quanti = resp));
        this.listQuantity = new productQuantityModel();
        this.listQuantity.quantityPro = this.quanti ;
      //  console.log(this.quanti );
        this.db.object("products").valueChanges().subscribe(res =>  {
          this.embryoService.setCartItemDefaultValue(res['gadgets'][i.id-10]);
        } );

      }
    });

  }



  ngAfterViewChecked() : void {
    this.cdRef.detectChanges();
  }
  public removeProduct(value:any) {
    let message = "Are you sure you want to delete this product?";
    this.embryoService.confirmationPopup(message).
    subscribe(res => {this.popupResponse = res},
      err => console.log(err),
      ()  => this.getPopupResponse(this.popupResponse, value)
    );
  }

  public getPopupResponse(response, value) {
  /*  if(response){
      this.embryoService.removeLocalCartProduct(value);
    }*/
  }

  public calculateProductSinglePrice(product:any, value: any) {
    let price = 0;
    product.quantity = value;
    price = product.price*value;
    return price;
  }

  public calculateTotalPrice() {
    let subtotal = 0;
    if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
      for(let product of this.embryoService.localStorageCartProducts) {
        subtotal += (product.price *product.quantity);
      }
      return subtotal;
    }
    return subtotal;

  }

  public getTotalPrice() {
    let total = 0;
    if(this.embryoService.localStorageCartProducts && this.embryoService.localStorageCartProducts.length>0) {
      for(let product of this.embryoService.localStorageCartProducts) {
        total += (product.price*product.quantity);
      }
      total += (this.embryoService.shipping+this.embryoService.tax);
      return total;
    }

    return total;

  }

  public updateLocalCartProduct() {
    this.embryoService.updateAllLocalCartProduct(this.embryoService.localStorageCartProducts);
    this.router.navigate(['/checkout/payment', this.parentRouteParams]);
  }
  generateQuote(){
    this.router.navigate(['/checkout/quote']);

  }
  public getQuantityValue(product) {
    if(product.quantity) {
      return product.quantity
    } else {
      return 1;
    }

  }

}
