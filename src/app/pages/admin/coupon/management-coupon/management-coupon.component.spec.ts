/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManagementCouponComponent } from './management-coupon.component';

describe('ManagementCouponComponent', () => {
  let component: ManagementCouponComponent;
  let fixture: ComponentFixture<ManagementCouponComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementCouponComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
