import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { InspeccionarProductoPage } from './inspeccionar-producto.page';

describe('InspeccionarProductoPage', () => {
  let component: InspeccionarProductoPage;
  let fixture: ComponentFixture<InspeccionarProductoPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(InspeccionarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
