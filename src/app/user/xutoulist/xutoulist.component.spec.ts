import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XutoulistComponent } from './xutoulist.component';

describe('XutoulistComponent', () => {
  let component: XutoulistComponent;
  let fixture: ComponentFixture<XutoulistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XutoulistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XutoulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
