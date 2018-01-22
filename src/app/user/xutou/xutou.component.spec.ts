import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XutouComponent } from './xutou.component';

describe('XutouComponent', () => {
  let component: XutouComponent;
  let fixture: ComponentFixture<XutouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XutouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XutouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
