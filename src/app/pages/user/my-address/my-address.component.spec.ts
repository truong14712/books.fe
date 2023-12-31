/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyAddressComponent } from './my-address.component';

describe('MyAddressComponent', () => {
  let component: MyAddressComponent;
  let fixture: ComponentFixture<MyAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MyAddressComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
