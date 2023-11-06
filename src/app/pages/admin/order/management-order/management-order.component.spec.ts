/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManagementOrderComponent } from './management-order.component';

describe('ManagementOrderComponent', () => {
  let component: ManagementOrderComponent;
  let fixture: ComponentFixture<ManagementOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementOrderComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
