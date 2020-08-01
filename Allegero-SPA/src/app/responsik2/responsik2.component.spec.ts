/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Responsik2Component } from './responsik2.component';

describe('Responsik2Component', () => {
  let component: Responsik2Component;
  let fixture: ComponentFixture<Responsik2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Responsik2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Responsik2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
