/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChangeInforMationComponent } from './change-infor-mation.component';

describe('ChangeInforMationComponent', () => {
  let component: ChangeInforMationComponent;
  let fixture: ComponentFixture<ChangeInforMationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeInforMationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInforMationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
