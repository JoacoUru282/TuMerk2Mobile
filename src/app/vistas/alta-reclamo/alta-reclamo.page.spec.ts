import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaReclamoPage } from './alta-reclamo.page';

describe('AltaReclamoPage', () => {
  let component: AltaReclamoPage;
  let fixture: ComponentFixture<AltaReclamoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AltaReclamoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
