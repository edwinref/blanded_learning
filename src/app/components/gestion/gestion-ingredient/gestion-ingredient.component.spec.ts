import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionIngredientComponent } from './gestion-ingredient.component';

describe('GestionIngredientsComponent', () => {
  let component: GestionIngredientComponent;
  let fixture: ComponentFixture<GestionIngredientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionIngredientComponent]
    });
    fixture = TestBed.createComponent(GestionIngredientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
