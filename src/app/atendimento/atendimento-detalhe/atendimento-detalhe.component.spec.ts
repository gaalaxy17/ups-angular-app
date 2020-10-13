import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoDetalheComponent } from './atendimento-detalhe.component';

describe('AtendimentoDetalheComponent', () => {
  let component: AtendimentoDetalheComponent;
  let fixture: ComponentFixture<AtendimentoDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
