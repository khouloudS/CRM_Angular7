import { Routes } from '@angular/router';

import { AccountComponent } from './Account/Account.component';
import { ProfileComponent } from './Profile/Profile.component';
import { EditProfileComponent } from './EditProfile/EditProfile.component';
import { CardsComponent } from './Cards/Cards.component';
import { AddressComponent } from './Address/Address.component';
import { OrderHistoryComponent } from './OrderHistory/OrderHistory.component';
import {QuoteHistoryComponent} from './quote-history/quote-history.component';
import {InvoiceHistoryComponent} from './invoice-history/invoice-history.component';
import {HistoryDetailsQuoteAdminComponent} from './history-details-quote-admin/history-details-quote-admin.component';
import {DashboardAdminComponent} from './dashboard-admin/dashboard-admin.component';
import {CouponAdminComponent} from './coupon-admin/coupon-admin.component';
import {ShowAllCouponAdminComponent} from './show-all-coupon-admin/show-all-coupon-admin.component';

export const UserAccountRoutes : Routes = [
   {
      path : '',
      component : AccountComponent,
      children: [
         {
            path: 'profile',
            component: ProfileComponent
         },
         {
            path: 'cards',
            component: CardsComponent
         },
         {
            path: 'address',
            component: AddressComponent
         },
         {
            path: 'order-history',
            component: OrderHistoryComponent
         },
         {
            path: 'profile/edit',
            component: EditProfileComponent
         },
        {
          path: 'quote-history/:reference',
          component: QuoteHistoryComponent
        },
        {
          path: 'invoice-history',
          component: InvoiceHistoryComponent
        },
        {
          path: 'history-details-quote-admin/:reference',
          component: HistoryDetailsQuoteAdminComponent
        },
        {
          path: 'dashbord-admin',
          component: DashboardAdminComponent
        },
        {
          path: 'coupon-admin',
          component: CouponAdminComponent
        },
        {
          path: 'show-all-coupon-admin',
          component: ShowAllCouponAdminComponent
        }
      ]
   }
]
