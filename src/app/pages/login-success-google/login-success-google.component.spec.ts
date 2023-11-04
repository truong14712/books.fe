/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginSuccessGoogleComponent } from './login-success-google.component';

describe('LoginSuccessGoogleComponent', () => {
  let component: LoginSuccessGoogleComponent;
  let fixture: ComponentFixture<LoginSuccessGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginSuccessGoogleComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSuccessGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
