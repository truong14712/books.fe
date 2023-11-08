/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModelReportComponent } from './model-report.component';

describe('ModelReportComponent', () => {
  let component: ModelReportComponent;
  let fixture: ComponentFixture<ModelReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelReportComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
