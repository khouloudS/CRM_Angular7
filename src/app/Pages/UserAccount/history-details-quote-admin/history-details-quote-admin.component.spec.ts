import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryDetailsQuoteAdminComponent } from './history-details-quote-admin.component';

describe('HistoryDetailsQuoteAdminComponent', () => {
  let component: HistoryDetailsQuoteAdminComponent;
  let fixture: ComponentFixture<HistoryDetailsQuoteAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryDetailsQuoteAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryDetailsQuoteAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
