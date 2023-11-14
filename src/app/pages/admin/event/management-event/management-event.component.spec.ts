/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManagementEventComponent } from './management-event.component';

describe('ManagementEventComponent', () => {
  let component: ManagementEventComponent;
  let fixture: ComponentFixture<ManagementEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementEventComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
