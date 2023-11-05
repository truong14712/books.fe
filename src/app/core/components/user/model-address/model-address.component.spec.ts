/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModelAddressComponent } from './model-address.component';

describe('ModelAddressComponent', () => {
  let component: ModelAddressComponent;
  let fixture: ComponentFixture<ModelAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelAddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
