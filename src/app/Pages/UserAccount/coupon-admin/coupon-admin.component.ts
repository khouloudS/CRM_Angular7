import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ToastaService, ToastOptions} from 'ngx-toasta';
import {ActivatedRoute, Router} from '@angular/router';
import {EmbryoService} from '../../../Services/Embryo.service';
import {QuoteService} from '../../../Services/quote.service';
import {postInvoiceModel, respInvoiceModel} from '../../../Model/Invoice';
import {postCoupon, respCompon} from '../../../Model/Coupon';

@Component({
  selector: 'app-coupon-admin',
  templateUrl: './coupon-admin.component.html',
  styleUrls: ['./coupon-admin.component.css']
})
export class CouponAdminComponent implements OnInit {
  type         : string;
  info         : FormGroup;
  address      : FormGroup;
  card         : FormGroup;
  emailPattern : any = /\S+@\S+\.\S+/;
  toastOption  : ToastOptions = {
    title     : "Account Information",
    msg       : "Your account information updated successfully!",
    showClose : true,
    timeout   : 3000,
    theme     : "material"
  };
  listUser: any;
  ID :number;
  private _Adresse :string;
  CIN:number;
  DateBirth:string;
  Email:string;
  Nom: string;
  Password: string;
  Prenom: string;
  Username: string;
  Operateur: string;
  birth: string;
  postCoup: postCoupon;
  resCoup: respCompon;

   reference: any;
   dateDebut: any;
  dateFin: any;
  promotion: any;
   condition: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formGroup : FormBuilder,
              private toastyService: ToastaService,
              public embryoService : EmbryoService, public  _quoteService: QuoteService) {

    this.route.params.subscribe(params => {
      this.route.queryParams.forEach(queryParams => {
        this.type = queryParams['type'];
      });
    });
    let item = JSON.parse(localStorage.getItem(this.embryoService.currentUser));

    this._quoteService.loginUser(item).subscribe(data => {
      for(let i of this.listUser = data) {
        console.log(this.listUser[0]['id']);
        this.Email = this.listUser[0]['email'];
        this.Nom = this.listUser[0]['nom'];
        this.Prenom = this.listUser[0]['prenom'];
        this._Adresse = this.listUser[0]['adresse'];
        this.CIN = this.listUser[0]['cin'];
        this.birth = this.listUser[0]['dateBirth'];
        console.log( this.Prenom );
      }});

    this.info = new FormGroup({
      ref   : new FormControl(''),
      dateDebute    : new FormControl(''),
      reduction         : new FormControl(''),
      seuil : new FormControl(''),
    });

  }



  ngOnInit() {



  }


  /**
   * Function is used to submit the profile info.
   * If form value is valid, redirect to profile page.
   */
  submitProfileInfo() {
    let newDate = new Date(this.info.get('dateDebute').value);
   newDate.setDate(newDate.getDate() + 5);
    console.log(this.reference);
    console.warn(this.info.value);
    this.postCoup  = new postCoupon();
    this.postCoup.ref = this.info.get('ref').value;
    this.postCoup.reduction = this.info.get('reduction').value;
    this.postCoup.dateFin = newDate;
    this.postCoup.dateDebute = this.info.get('dateDebute').value;
    this.postCoup.seuil = this.info.get('seuil').value;




    this._quoteService.addCoupon(this.postCoup).subscribe((res: respCompon) => {
        this.resCoup = res;
      });



    }


  /**
   * Function is used to submit the profile address.
   * If form value is valid, redirect to address page.
   */
  submitAddress() {
    if(this.address.valid){
      this.router.navigate(['/account/address']).then(()=>{
        this.toastyService.success(this.toastOption);
      });
    } else {
      for (let i in this.address.controls) {
        this.address.controls[i].markAsTouched();
      }
    }
  }

  /**
   * Function is used to submit the profile card.
   * If form value is valid, redirect to card page.
   */
  submitCard() {
    if(this.card.valid) {
      this.router.navigate(['/account/card']).then(()=>{
        this.toastyService.success(this.toastOption);
      });
    } else {
      for(let i in this.card.controls) {
        this.card.controls[i].markAsTouched();
      }
    }
  }

}
