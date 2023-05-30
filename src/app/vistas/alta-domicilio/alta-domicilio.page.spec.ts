import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaDomicilioPage } from './alta-domicilio.page';

describe('AltaDomicilioPage', () => {
  let component: AltaDomicilioPage;
  let fixture: ComponentFixture<AltaDomicilioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AltaDomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
