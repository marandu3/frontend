import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cskills } from './cskills';

describe('Cskills', () => {
  let component: Cskills;
  let fixture: ComponentFixture<Cskills>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cskills]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cskills);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
