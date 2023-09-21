/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManagementBookComponent } from './management-book.component';

describe('ManagementBookComponent', () => {
  let component: ManagementBookComponent;
  let fixture: ComponentFixture<ManagementBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementBookComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
