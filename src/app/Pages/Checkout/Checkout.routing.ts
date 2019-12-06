import { Routes } from '@angular/router';

import { SigninComponent } from './Signin/Signin.component';
import { PaymentComponent } from './Payment/Payment.component';
import { FinalReceiptComponent } from './FinalReceipt/FinalReceipt.component';
import {QuoteComponent} from './quote/quote.component';
import {QuoteReceiptComponent} from './quote-receipt/quote-receipt.component';
import {QuoteTableComponent} from './quote-table/quote-table.component';

export const CheckoutRoutes : Routes = [
   {
      path : "",
      component: SigninComponent
   },
  {
    path : "payment/:reference",
    component: PaymentComponent
  },
   {
      path: 'signin',
      component: SigninComponent
   },
  {
		path: 'payment',
		component: PaymentComponent
	},
   {
      path: 'final-receipt/:reference',
      component: FinalReceiptComponent
   },
  {
    path: 'quote',
    component: QuoteComponent
  },
  {
    path: 'quote-receipt',
    component: QuoteReceiptComponent
  },
  {
    path: 'quote-table',
    component: QuoteTableComponent
  }
]
