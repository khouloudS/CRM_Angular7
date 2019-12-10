import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {QuoteService} from '../../Services/quote.service';
import {EmbryoService} from '../../Services/Embryo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'embryo-HeaderUserProfileDropdown',
  templateUrl: './HeaderUserProfileDropdown.component.html',
  styleUrls: ['./HeaderUserProfileDropdown.component.scss']
})
export class HeaderUserProfileDropdownComponent implements OnInit {

   constructor(private _quoteService: QuoteService, public embryoService: EmbryoService,
               public router: Router, private dataService: QuoteService,
               private route: ActivatedRoute,
               private loadingBar: LoadingBarService,
               private cdRef : ChangeDetectorRef,
               private db: AngularFireDatabase) { }

   ngOnInit() {
   }

  logout() {
    // /session/signin'

    let key = this.embryoService.currentUser;
    //let myObj = 0;
   localStorage.removeItem(key);
    this.router.navigate(['/home']);

  }
}
