import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ctimeline } from './ctimeline';

describe('Ctimeline', () => {
  let component: Ctimeline;
  let fixture: ComponentFixture<Ctimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ctimeline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ctimeline);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
