import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsxutouComponent } from './detailsxutou.component';

describe('DetailsxutouComponent', () => {
  let component: DetailsxutouComponent;
  let fixture: ComponentFixture<DetailsxutouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsxutouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsxutouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
