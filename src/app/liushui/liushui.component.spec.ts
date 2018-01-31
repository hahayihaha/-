import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiushuiComponent } from './liushui.component';

describe('LiushuiComponent', () => {
  let component: LiushuiComponent;
  let fixture: ComponentFixture<LiushuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiushuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiushuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
