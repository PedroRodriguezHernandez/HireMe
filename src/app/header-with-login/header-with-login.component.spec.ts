import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWithLoginComponent } from './header-with-login.component';

describe('HeaderWithLoginComponent', () => {
  let component: HeaderWithLoginComponent;
  let fixture: ComponentFixture<HeaderWithLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderWithLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderWithLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
