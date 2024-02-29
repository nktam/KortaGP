import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenarListaComponent } from './ordenar-lista.component';

describe('OrdenarListaComponent', () => {
  let component: OrdenarListaComponent;
  let fixture: ComponentFixture<OrdenarListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenarListaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdenarListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
