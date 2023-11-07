/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManagementReportComponent } from './management-report.component';

describe('ManagementReportComponent', () => {
  let component: ManagementReportComponent;
  let fixture: ComponentFixture<ManagementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementReportComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
