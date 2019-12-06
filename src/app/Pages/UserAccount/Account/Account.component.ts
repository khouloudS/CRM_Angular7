import { Component, OnInit } from '@angular/core';
import {EmbryoService} from '../../../Services/Embryo.service';

@Component({
  selector: 'app-Account',
  templateUrl: './Account.component.html',
  styleUrls: ['./Account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(public  embryoService : EmbryoService) { }

  item : any;
  ngOnInit() {
    this.item = JSON.parse(localStorage.getItem(this.embryoService.currentUser));
  }

}
