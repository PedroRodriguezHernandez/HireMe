import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderInitialPageComponent } from './header-initial-page.component';

describe('HeaderInitialPageComponent', () => {
  let component: HeaderInitialPageComponent;
  let fixture: ComponentFixture<HeaderInitialPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderInitialPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderInitialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
