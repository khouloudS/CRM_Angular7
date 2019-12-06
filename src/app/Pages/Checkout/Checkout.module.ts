import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule,
	MatCardModule,
	MatMenuModule,
	MatToolbarModule,
	MatIconModule,
	MatInputModule,
	MatDatepickerModule,
	MatNativeDateModule,
	MatProgressSpinnerModule,
	MatTableModule,
	MatExpansionModule,
	MatSelectModule,
	MatSnackBarModule,
	MatTooltipModule,
	MatChipsModule,
	MatListModule,
	MatSidenavModule,
	MatTabsModule,
	MatProgressBarModule,
	MatCheckboxModule,
	MatSliderModule,
	MatRadioModule,
	MatDialogModule,
	MatGridListModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'ngx-card/ngx-card';

import { FlexLayoutModule } from '@angular/flex-layout';
import { CheckoutRoutes } from './Checkout.routing';
import { PaymentComponent } from './Payment/Payment.component';
import { SigninComponent } from './Signin/Signin.component';
import { FinalReceiptComponent } from './FinalReceipt/FinalReceipt.component';

import { GlobalModule } from '../../Global/Global.module';
import { QuoteComponent } from './quote/quote.component';
import { QuoteReceiptComponent } from './quote-receipt/quote-receipt.component';
import {QuoteTableComponent} from './quote-table/quote-table.component';
import {NgxQRCodeModule} from 'ngx-qrcode2';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatSliderModule,
    MatRadioModule,
    MatDialogModule,
    MatGridListModule,
    RouterModule.forChild(CheckoutRoutes),
    GlobalModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    NgxQRCodeModule
  ],
   declarations: [
      PaymentComponent,
      SigninComponent,
      FinalReceiptComponent,
      QuoteComponent,
      QuoteReceiptComponent,
     QuoteTableComponent
   ]
})
export class CheckoutModule { }
