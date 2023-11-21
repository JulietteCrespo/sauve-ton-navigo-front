import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailDeclarationComponent } from './detail-declaration.component';

describe('DetailDeclarationComponent', () => {
  let component: DetailDeclarationComponent;
  let fixture: ComponentFixture<DetailDeclarationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailDeclarationComponent]
    });
    fixture = TestBed.createComponent(DetailDeclarationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
