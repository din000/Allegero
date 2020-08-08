/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Main_siteComponent } from './main_site.component';

describe('Main_siteComponent', () => {
  let component: Main_siteComponent;
  let fixture: ComponentFixture<Main_siteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Main_siteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Main_siteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
