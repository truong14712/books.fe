/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModelAccountComponent } from './model-account.component';

describe('ModelAccountComponent', () => {
  let component: ModelAccountComponent;
  let fixture: ComponentFixture<ModelAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelAccountComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
