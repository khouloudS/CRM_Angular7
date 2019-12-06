import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteReceiptComponent } from './quote-receipt.component';

describe('QuoteReceiptComponent', () => {
  let component: QuoteReceiptComponent;
  let fixture: ComponentFixture<QuoteReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
