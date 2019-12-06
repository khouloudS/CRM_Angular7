import { Component, OnInit } from '@angular/core';
import * as CanvasJS from 'src/canvasjs.min.js';
import {QuoteService} from '../../../Services/quote.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {EmbryoService} from '../../../Services/Embryo.service';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  public quote = [];
  public quoteStatistics = [];
  dataResult: [{
    y: number;
    name: string;
  }];
  listIdProduct = [];
  genereted = 'généré';
  nongenereted = 'non généré';
  nbTotal : number;
  nbTotalExpired: number;
  nbTotalGeneratedTonInvoice: number;
  productList: any;
  allProducts: any;
  productData: [
    {
      nom: string ;
      nb: number;
    }
  ];
  constructor(private  _quoteService: QuoteService, private db: AngularFireDatabase, public embryoService: EmbryoService) {

  }
  ngOnInit() {
    let cpt = 0 ;

    this._quoteService.findProducts().subscribe(data => {
      for (let i of this.productList = data) {
        this._quoteService.products().subscribe( res => {
            for (let  j of this.allProducts = res) {
              if (i.id == j.id) {
                cpt ++ ;
              }
              console.log(i.name + '=====>' + cpt);
            }

          }
        );
      }

    });
    this._quoteService.getQuotesStatistics().subscribe(data => {
        for (let i of  this.quoteStatistics = data ) {
            this.nbTotal =  this.quoteStatistics[0]['totalQuote'];
            console.log(this.nbTotal);
          this.nbTotalExpired =  this.quoteStatistics[0]['totalQuoteExpired'];
          this.nbTotalGeneratedTonInvoice =  this.quoteStatistics[0]['numberOfQuoteGeneratedToInvoice'];

      let chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Devis"
        },
        data: [{
          type: "column",
          dataPoints: [
            { y: this.nbTotal, label: "Nombre devis" },
            { y: this.nbTotalExpired, label: "Nombre devis expiré" },
            { y: this.nbTotalGeneratedTonInvoice, label: "Nombre devis en facture" }

          ]
        }]
      });

      chart.render();
        }
      }
    );

  }

}
