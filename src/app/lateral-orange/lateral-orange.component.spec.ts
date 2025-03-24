import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LateralOrangeComponent } from './lateral-orange.component';

describe('LateralOrangeComponent', () => {
  let component: LateralOrangeComponent;
  let fixture: ComponentFixture<LateralOrangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LateralOrangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LateralOrangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
