import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoConsultaComponent } from './chamado-consulta.component';

describe('ChamadoConsultaComponent', () => {
  let component: ChamadoConsultaComponent;
  let fixture: ComponentFixture<ChamadoConsultaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamadoConsultaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamadoConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
