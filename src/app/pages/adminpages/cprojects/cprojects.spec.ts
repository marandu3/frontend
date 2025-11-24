import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cprojects } from './cprojects';

describe('Cprojects', () => {
  let component: Cprojects;
  let fixture: ComponentFixture<Cprojects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cprojects]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cprojects);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
