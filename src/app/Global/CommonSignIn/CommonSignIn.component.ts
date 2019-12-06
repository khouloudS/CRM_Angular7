import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EmbryoService} from '../../Services/Embryo.service';
import {QuoteService} from '../../Services/quote.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'embryo-SignIn',
  templateUrl: './CommonSignIn.component.html',
  styleUrls: ['./CommonSignIn.component.scss']
})
export class CommonSignInComponent implements OnInit {
  listUser : any;
  token: string;
  email: string;
  constructor(private _quoteService: QuoteService, public embryoService: EmbryoService,
              public router: Router, private dataService: QuoteService,
              private route: ActivatedRoute,
              private loadingBar: LoadingBarService,
              private cdRef : ChangeDetectorRef,
              private db: AngularFireDatabase,) { }

  ngOnInit() {

  }
  login()
  {
// Read item:
    console.log(this.email);

    //
    this._quoteService.loginCLient('khouloud.sellami@esprit.tn', 'azert').subscribe(data => this.listUser = data  );
    console.log(this.listUser);
    let key = this.embryoService.currentUser;
    let myObj = 22;
    localStorage.setItem(key, String(myObj) );

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
