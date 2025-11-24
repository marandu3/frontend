import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cabout } from './cabout';

describe('Cabout', () => {
  let component: Cabout;
  let fixture: ComponentFixture<Cabout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cabout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cabout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
