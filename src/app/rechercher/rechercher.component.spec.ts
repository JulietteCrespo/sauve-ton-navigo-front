import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherComponent } from './rechercher.component';

describe('RechercherComponent', () => {
  let component: RechercherComponent;
  let fixture: ComponentFixture<RechercherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RechercherComponent]
    });
    fixture = TestBed.createComponent(RechercherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
