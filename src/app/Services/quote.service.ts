import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {postData, quoteClientAffect, respData} from '../Model/Quote';
import {postDataQuoteDetails, respDataQuoteDetails} from '../Model/QuoteDetails';
import {postProduct} from '../Model/Product';
import {postInvoiceModel, respInvoiceModel} from '../Model/Invoice';
import {postPayment, respPayment} from '../Model/Payment';
import {postUserModel} from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  url = 'http://localhost:9080/CRM_PI-web/rest/quote/getAllQuoteDetails' ;
  urlStatistics = 'http://localhost:9080/CRM_PI-web/rest/quote/countNumberQuoteGeneratedToInvoice' ;
  postUrlQuote = 'http://localhost:9080/CRM_PI-web/rest/quote';
  postUserToQuote = 'http://localhost:9080/CRM_PI-web/rest/quote/affecterQuoteClient';
  postUrlQuoteDetails = 'http://localhost:9080/CRM_PI-web/rest/quote/addProductQuoteDetails';
  urlQuoteByClient = 'http://localhost:9080/CRM_PI-web/rest/quote/getAllQuoteDetailsByClient';
  urlQuoteProduct = 'http://localhost:9080/CRM_PI-web/rest/quote/getQuoteWithProduct';
  urlProductByQute = 'http://localhost:9080/CRM_PI-web/rest/quote';
  urlPostInvoice = 'http://localhost:9080/CRM_PI-web/rest/invoice/';
  urlPayment = 'http://localhost:9080/CRM_PI-web/rest/invoice/payeInvoice/';
  urlNumberProduct = 'http://localhost:9080/CRM_PI-web/rest/quote/countNumberQuoteGeneratedToInvoice';
  urlLogin = 'http://localhost:9080/CRM_PI-web/rest/quote/login';
  urlLoginUser = 'http://localhost:9080/CRM_PI-web/rest/quote/loginClient';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  constructor(private  http: HttpClient) { }
  public  getQuote(): Observable<postData[]> {
    return this.http.get<postData[]>(this.url);
  }
  addPost (postD: postData) {
    return this.http.post(this.postUrlQuote, postD, this.httpOptions);
  }
  affectQuoteToClient(quoteId: number, clientId: number, affect: quoteClientAffect){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<quoteClientAffect>(
      this.postUserToQuote  + '/' + quoteId + '/' + clientId, affect, this.httpOptions );
  }
  addInvoice (quoteRef: string, postInvoice: postInvoiceModel){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<postInvoiceModel>(
      this.urlPostInvoice + quoteRef, postInvoice, this.httpOptions );
  }
  doPayment (quoteRef: string, paye: postPayment){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<postPayment>(
      this.urlPayment + quoteRef, paye, this.httpOptions );
  }
  postQuoteDetails(idProduct: number, idQuote: number, quantity: number, quoteDetails: postDataQuoteDetails){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<postDataQuoteDetails>(this.postUrlQuoteDetails + '/' + idProduct + '/' + idQuote + '/' + quantity, quoteDetails , this.httpOptions);
  }

  public  loginUser(idClient: number): Observable<postUserModel[]> {
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get<postUserModel[]>(this.urlLogin + '/' + idClient, {
      headers: httpHeaders,
      responseType: 'json'
    });
  }

  public  getQuoteByClient(idClient: number): Observable<postData[]> {
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json');
    let httpParams = new HttpParams()
      .set('idClient', String(idClient));
    console.log(httpParams.toString());
    return this.http.get<postData[]>(this.urlQuoteByClient + '/' + idClient, {
      headers: httpHeaders,
      responseType: 'json'
    });
  }
  public  getQuoteProduct(reference: string): Observable<postData[]> {
      let httpHeaders = new HttpHeaders()
        .set('Accept', 'application/json');
    let httpParams = new HttpParams()
      .set('reference', reference);
    console.log(httpParams.toString());
    return this.http.get<postData[]>(this.urlQuoteProduct + '/' + reference, {
      headers: httpHeaders,
      responseType: 'json'
    });

  }
  public  getProductByQuote(reference: string): Observable<postProduct[]> {
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json');
    let httpParams = new HttpParams()
      .set('reference', reference);
    console.log(httpParams.toString());
    return this.http.get<postProduct[]>(this.urlProductByQute + '/' + reference, {
      headers: httpHeaders,
      responseType: 'json'
    });
  }
  public  findAllProductByQuoteAndNumber(idProduit: number, reference: string): Observable<number> {
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json');
    let httpParams = new HttpParams()
      .set('reference', reference);
    console.log(httpParams.toString());
    return this.http.get<number>(this.urlNumberProduct + '/' + idProduit + '/' + reference, {
      headers: httpHeaders,
      responseType: 'json'
    });
  }
  public  loginCLient(email: string, token: string): Observable<postUserModel[]> {
    let httpHeaders = new HttpHeaders()
      .set('Accept', 'application/json');
    return this.http.get<postUserModel[]>(this.urlLoginUser + '/' + email + '/' + token, {
      headers: httpHeaders,
      responseType: 'json'
    });
  }

}
