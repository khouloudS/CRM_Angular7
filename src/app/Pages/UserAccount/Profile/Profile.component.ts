import { Component, OnInit } from '@angular/core';
import {EmbryoService} from '../../../Services/Embryo.service';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {QuoteService} from '../../../Services/quote.service';

@Component({
  selector: 'app-Profile',
  templateUrl: './Profile.component.html',
  styleUrls: ['./Profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
  birth: string;
   constructor(public embryoService : EmbryoService,
               private formGroup : FormBuilder,
               public router: Router,
               public  _quoteService: QuoteService) { }

   ngOnInit() {
     let item = JSON.parse(localStorage.getItem(this.embryoService.currentUser));

     this._quoteService.loginUser(item).subscribe(data => {
       for(let i of this.listUser = data) {
         console.log(this.listUser[0]['id']);
         this.Email = this.listUser[0]['email'];
         this.Nom = this.listUser[0]['nom'];
         this.Prenom = this.listUser[0]['prenom'];
         this.Adresse = this.listUser[0]['adresse'];
         this.CIN = this.listUser[0]['cin'];
         this.birth = this.listUser[0]['dateBirth'];
         console.log( this.Prenom );
       }});

   }

}
