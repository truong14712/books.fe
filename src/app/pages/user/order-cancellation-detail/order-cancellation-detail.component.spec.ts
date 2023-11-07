/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OrderCancellationDetailComponent } from './order-cancellation-detail.component';

describe('OrderCancellationDetailComponent', () => {
  let component: OrderCancellationDetailComponent;
  let fixture: ComponentFixture<OrderCancellationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderCancellationDetailComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCancellationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
