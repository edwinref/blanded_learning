import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRecetteComponent } from './gestion-recette.component';

describe('GestionRecetteComponent', () => {
  let component: GestionRecetteComponent;
  let fixture: ComponentFixture<GestionRecetteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRecetteComponent]
    });
    fixture = TestBed.createComponent(GestionRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
