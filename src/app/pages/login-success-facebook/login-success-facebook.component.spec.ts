/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginSuccessFacebookComponent } from './login-success-facebook.component';

describe('LoginSuccessFacebookComponent', () => {
  let component: LoginSuccessFacebookComponent;
  let fixture: ComponentFixture<LoginSuccessFacebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSuccessFacebookComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSuccessFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
