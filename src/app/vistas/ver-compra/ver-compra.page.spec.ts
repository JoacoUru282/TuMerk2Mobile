import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerCompraPage } from './ver-compra.page';

describe('VerCompraPage', () => {
  let component: VerCompraPage;
  let fixture: ComponentFixture<VerCompraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VerCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
