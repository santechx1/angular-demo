import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginADComponent } from './login-ad.component';

describe('LoginADComponent', () => {
  let component: LoginADComponent;
  let fixture: ComponentFixture<LoginADComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginADComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginADComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
