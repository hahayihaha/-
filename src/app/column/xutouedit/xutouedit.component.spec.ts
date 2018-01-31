import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XutoueditComponent } from './xutouedit.component';

describe('XutoueditComponent', () => {
  let component: XutoueditComponent;
  let fixture: ComponentFixture<XutoueditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XutoueditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XutoueditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
