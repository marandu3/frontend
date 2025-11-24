import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ceducation } from './ceducation';

describe('Ceducation', () => {
  let component: Ceducation;
  let fixture: ComponentFixture<Ceducation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ceducation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ceducation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
