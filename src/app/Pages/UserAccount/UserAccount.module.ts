import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule,
   MatBadgeModule,
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserAccountRoutes } from './UserAccount.routing';
import { AccountComponent } from './Account/Account.component';
import { ProfileComponent } from './Profile/Profile.component';
import { EditProfileComponent } from './EditProfile/EditProfile.component';
import { CardsComponent } from './Cards/Cards.component';
import { AddressComponent } from './Address/Address.component';
import { OrderHistoryComponent } from './OrderHistory/OrderHistory.component';
import { QuoteHistoryComponent } from './quote-history/quote-history.component';
import {GlobalModule} from '../../Global/Global.module';
import {TemplatesModule} from '../../Templates/Templates.module';
import {NgAisHitsModule} from 'angular-instantsearch';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { InvoiceHistoryComponent } from './invoice-history/invoice-history.component';
import { HistoryDetailsQuoteAdminComponent } from './history-details-quote-admin/history-details-quote-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {GrdFilterPipe} from './grd-filter.pipe';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserAccountRoutes),
    MatBadgeModule,
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
    FormsModule,
    ReactiveFormsModule,
    GlobalModule,
    TemplatesModule,
    NgAisHitsModule,
    SlickCarouselModule,
    NgxPaginationModule
  ],
  declarations: [
     AccountComponent,
     ProfileComponent,
     EditProfileComponent,
     CardsComponent,
     AddressComponent,
     OrderHistoryComponent, QuoteHistoryComponent, InvoiceHistoryComponent, HistoryDetailsQuoteAdminComponent, DashboardAdminComponent, GrdFilterPipe

   ]
})
export class UserAccountModule { }
