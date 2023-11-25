import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEtapeComponent } from './add-new-etape.component';

describe('AddNewEtapeComponent', () => {
  let component: AddNewEtapeComponent;
  let fixture: ComponentFixture<AddNewEtapeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewEtapeComponent]
    });
    fixture = TestBed.createComponent(AddNewEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
