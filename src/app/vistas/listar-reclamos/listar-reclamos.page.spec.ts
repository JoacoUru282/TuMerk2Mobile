import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarReclamosPage } from './listar-reclamos.page';

describe('ListarReclamosPage', () => {
  let component: ListarReclamosPage;
  let fixture: ComponentFixture<ListarReclamosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListarReclamosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
