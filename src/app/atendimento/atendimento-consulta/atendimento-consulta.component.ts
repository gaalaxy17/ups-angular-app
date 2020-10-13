import { Component, OnInit } from '@angular/core';
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
    dtFiltroAte: null
  }

  chamados: any = [];
  empresas: any = [];
  unidades: any = [];
  tiposAtendimento: any = [];

  constructor(private chamadoService: ChamadoService) { }

  ngOnInit(): void {
    this.carregarCombos();
    this.buscar();
  }

  carregarCombos() {
    this.chamadoService.carregarCombos().then((combos) => {
      this.tiposAtendimento = combos.tiposAtendimento;
      this.empresas = combos.empresas;
    })
  }

  buscar() {

    this.chamadoService.buscar(this.filtro).then((results) => {
      this.chamados = results;
      console.log(results);
    })

  }

  limpar() {
    this.filtro = {
      cdAtendimento: null,
      nmEmpresa: null,
      cdTipoAtendimento: null,
      dtFiltroDe: null,
      dtFiltroAte: null
    }
  }

}
