import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalListPage } from './local-list.page';

describe('LocalListPage', () => {
  let component: LocalListPage;
  let fixture: ComponentFixture<LocalListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LocalListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
