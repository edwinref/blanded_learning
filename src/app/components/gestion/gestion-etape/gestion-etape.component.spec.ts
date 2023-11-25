import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEtapeComponent } from './gestion-etape.component';

describe('GestionEtapeComponent', () => {
  let component: GestionEtapeComponent;
  let fixture: ComponentFixture<GestionEtapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionEtapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionEtapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
