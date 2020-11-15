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
    dsTipoEquipamento: null,
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

  tiposEquipamento = [
    "GMG", "Nobreak", "Infraestrutura"
  ]

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

  exportarDados() {

    let data = this.atendimentos;
    let filename = "atendimentos";

    if(data.length > 0){
      let csvData = this.convertToCSV(data, ['cdAtendimento','dtCriacao', 'dtAtendimento', 'nmEmpresa', 'nmUnidade', 'dsTipoAtendimento','tecnicos','dsUserChamado', 'dsUserAtendimento', 'stStatus']);
      console.log(csvData)
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
    }

    
}

convertToCSV(objArray, headerList) {
     let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
     let str = '';
     let row = '-,';

     for (let index in headerList) {
         row += headerList[index] + ',';
     }
     row = row.slice(0, -1);
     str += row + '\r\n';
     for (let i = 0; i < array.length; i++) {
         let line = (i+1)+'';
         for (let index in headerList) {
            let head = headerList[index];

             line += ',' + array[i][head];
         }
         str += line + '\r\n';
     }
     return str;
 }

}
