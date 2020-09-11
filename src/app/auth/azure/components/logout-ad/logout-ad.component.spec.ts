import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutADComponent } from './logout-ad.component';

describe('LogoutADComponent', () => {
  let component: LogoutADComponent;
  let fixture: ComponentFixture<LogoutADComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoutADComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutADComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
