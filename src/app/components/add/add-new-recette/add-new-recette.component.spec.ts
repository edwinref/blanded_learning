import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRecetteComponent } from './add-new-recette.component';

describe('AddNewRecetteComponent', () => {
  let component: AddNewRecetteComponent;
  let fixture: ComponentFixture<AddNewRecetteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewRecetteComponent]
    });
    fixture = TestBed.createComponent(AddNewRecetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
