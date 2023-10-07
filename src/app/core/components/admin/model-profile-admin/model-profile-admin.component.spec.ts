/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModelProfileAdminComponent } from './model-profile-admin.component';

describe('ModelProfileAdminComponent', () => {
  let component: ModelProfileAdminComponent;
  let fixture: ComponentFixture<ModelProfileAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModelProfileAdminComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelProfileAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
