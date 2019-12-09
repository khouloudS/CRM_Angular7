import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllCouponAdminComponent } from './show-all-coupon-admin.component';

describe('ShowAllCouponAdminComponent', () => {
  let component: ShowAllCouponAdminComponent;
  let fixture: ComponentFixture<ShowAllCouponAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllCouponAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllCouponAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
