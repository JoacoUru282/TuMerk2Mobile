import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReclamoPage } from './reclamo.page';

describe('ReclamoPage', () => {
  let component: ReclamoPage;
  let fixture: ComponentFixture<ReclamoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReclamoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
