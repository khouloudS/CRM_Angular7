import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EmbryoService} from '../../Services/Embryo.service';
import {QuoteService} from '../../Services/quote.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'embryo-SignIn',
  templateUrl: './CommonSignIn.component.html',
  styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {
  listUser : any;
  token: string;
  email: string;
  info         : FormGroup;
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
  constructor(private _quoteService: QuoteService, public embryoService: EmbryoService,
              public router: Router, private dataService: QuoteService,
              private route: ActivatedRoute,
              private loadingBar: LoadingBarService,
              private cdRef : ChangeDetectorRef,
              private db: AngularFireDatabase,) {

    this.info = new FormGroup({
      email   : new FormControl(''),
      token    : new FormControl('')
    });
  }

  ngOnInit() {

  }
  login()
  {
// Read item:
    console.log(this.email);

    let key = this.embryoService.currentUser;
   let myObj = 0;
console.log(this.info.get('token').value);
    //
    this._quoteService.loginCLient(this.info.get('email').value, this.info.get('token').value).subscribe(data =>
      {
        for (let v of this.listUser = data){
          console.log(this.listUser[0]['id']);
          localStorage.setItem(key, String(this.listUser[0]['id']));
        }
      }
    );
    this.router.navigate(['/home']);

//    localStorage.setItem(key, String(this.listUser[0]['id']) );
    console.log(this.listUser);

// Read item:
  //  let item = JSON.parse(localStorage.getItem(key));
   // localStorage.setItem(currentUser, this.listUser['id']);
    // let item = JSON.parse(localStorage.getItem(currentUser));
    //{
     // console.log(this.listUser);
   //   for (let i of this.listUser = data){
        //console.log(this.listUser['id']);
        /*if(this.listUser['email'] === 'khouloud.sellami@esprit.tn')
        {
         let myObj = {
          Adresse: i.Adresse,
          CIN: i.CIN,
          DateBirth: i.DateBirth,
          Email: i.Email,
          Nom: i.Nom,
          Password: i.Password,
          Prenom: i.Prenom,
          Username: i.Username,
          Operateur: i.Operateur
          };
      }}}*/


  }

}
