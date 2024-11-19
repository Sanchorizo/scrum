import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterTexteComponent } from './ajouter-texte.component';

describe('AjouterTexteComponent', () => {
  let component: AjouterTexteComponent;
  let fixture: ComponentFixture<AjouterTexteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjouterTexteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterTexteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
