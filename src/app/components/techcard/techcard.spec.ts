import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Techcard } from './techcard';

describe('Techcard', () => {
  let component: Techcard;
  let fixture: ComponentFixture<Techcard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Techcard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Techcard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
