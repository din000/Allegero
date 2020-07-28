/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ResponsikComponent } from './responsik.component';

describe('ResponsikComponent', () => {
  let component: ResponsikComponent;
  let fixture: ComponentFixture<ResponsikComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsikComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
