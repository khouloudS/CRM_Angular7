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
  listIdProduct : any;
  genereted = 'généré';
  nongenereted = 'non généré';
  nbTotal : number;
  nbTotalExpired: number;
  nbTotalGeneratedTonInvoice: number;
  productList: any;
  allProducts: any;
  productTotalData: number;

  productData: Object[] = [];
  constructor(private  _quoteService: QuoteService, private db: AngularFireDatabase, public embryoService: EmbryoService) {

  }
  ngOnInit() {

    let nomb = 0;
        this._quoteService.products().subscribe( res => {
            for (let  j of this.allProducts = res) {
              let cpt = 0 ;
              this._quoteService.findProducts().subscribe(data => {
                for (let i of this.productList = data) {
                 if (j.id === i.id){
                   cpt++;
                 }

                }
             this.productData.push({
               y : cpt,
               label : j.name
             });
                console.log(this.productData);


                console.log(j.id+ ' count is ' + cpt);

                let chart = new CanvasJS.Chart("chartLineContainer", {
                  animationEnabled: true,

                  title:{
                    text:"Comparaison d'achat des produits"
                  },
                  axisX:{
                    interval: 1
                  },
                  axisY2:{
                    interlacedColor: "rgba(1,77,101,.2)",
                    gridColor: "rgba(1,77,101,.1)",
                    title: "Nombre de produit"
                  },
                  data: [{
                    type: "bar",
                    name: "companies",
                    axisYType: "secondary",
                    color: "#014D65",
                    dataPoints: this.productData
                  }]
                });
                chart.render();

              });
          }
      });



    this._quoteService.getQuotesStatistics().subscribe(data => {
        for (let i of  this.quoteStatistics = data ) {
            this.nbTotal =  this.quoteStatistics[0]['totalQuote'];
           // console.log(this.nbTotal);
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
