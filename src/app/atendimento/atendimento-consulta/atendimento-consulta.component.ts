import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { AtendimentoService } from 'app/services/atendimento.service';
import { ChamadoService } from 'app/services/chamado.service';

@Component({
  selector: 'app-atendimento-consulta',
  templateUrl: './atendimento-consulta.component.html',
  styleUrls: ['./atendimento-consulta.component.css']
})
export class AtendimentoConsultaComponent implements OnInit {


  public page = 1;
  public pageSize = 10;

  filtro: any = {
    cdAtendimento: null,
    nmEmpresa: null,
    cdTipoAtendimento: null,
    dtFiltroDe: null,
    dtFiltroAte: null,
    cdLoginTecnico: null,
    dtFiltroAtendimentoDe: null,
    dtFiltroAtendimentoAte: null,
    stStatus: "atendimento_pendente_confirmacao"
  }

  atendimentos: any = [];
  empresas: any = [];
  unidades: any = [];
  tiposAtendimento: any = [];
  tecnicos: any = [];

  private readonly notifier: NotifierService;

  constructor(private chamadoService: ChamadoService, private atendimentoService: AtendimentoService, private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.carregarCombos();
    this.buscar();
  }

  carregarCombos() {
    this.chamadoService.carregarCombos().then((combos) => {
      this.tiposAtendimento = combos.tiposAtendimento;
      this.empresas = combos.empresas;
      this.tecnicos = combos.tecnicos;
    })
  }

  buscar() {

    this.atendimentoService.buscar(this.filtro).then((atendimentos) => {
      this.atendimentos = atendimentos;

      if (atendimentos.length > 0) {
        atendimentos.forEach((item, i) => {
          item.fgChecked = false;
        })
      }

      console.log(atendimentos);
    })

  }

  limpar() {
    this.filtro = {
      cdAtendimento: null,
      nmEmpresa: null,
      cdTipoAtendimento: null,
      dtFiltroDe: null,
      dtFiltroAte: null,
      cdLoginTecnico: null,
      dtFiltroAtendimentoDe: null,
      dtFiltroAtendimentoAte: null,
      stStatus: "atendimento_pendente_confirmacao"
    }
  }

  confirmarSelecionados() {

    var success = false;

    if (this.atendimentos.length > 0) {
      this.atendimentos.forEach((item, i) => {
        if (item.fgChecked) {
          this.atendimentoService.confirmar(item.cdAtendimento).then((results) => {
            console.log(results);
            success = true;
            this.buscar();
          })
        }
      })

      if (success) {
        this.notifier.notify("success", "Atendimentos confirmado com sucesso!");

      }
    }
  }

}
