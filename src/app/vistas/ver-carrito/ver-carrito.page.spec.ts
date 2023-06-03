import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerCarritoPage } from './ver-carrito.page';

describe('VerCarritoPage', () => {
  let component: VerCarritoPage;
  let fixture: ComponentFixture<VerCarritoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerCarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
