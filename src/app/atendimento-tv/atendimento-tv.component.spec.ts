import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendimentoTvComponent } from './atendimento-tv.component';

describe('AtendimentoTvComponent', () => {
  let component: AtendimentoTvComponent;
  let fixture: ComponentFixture<AtendimentoTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendimentoTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendimentoTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
