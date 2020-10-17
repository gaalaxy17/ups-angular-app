import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ActivatedRoute } from '@angular/router';
import { ChamadoService } from 'app/services/chamado.service';
import { ClienteService } from 'app/services/cliente.service';
import { TipoAtendimento } from 'app/commons/enum/tipoAtendimento';
import { AtendimentoService } from 'app/services/atendimento.service';

@Component({
  selector: 'app-atendimento-detalhe',
  templateUrl: './atendimento-detalhe.component.html',
  styleUrls: ['./atendimento-detalhe.component.css']
})
export class AtendimentoDetalheComponent implements OnInit {

  cdCliente = null;
  chamadoFormSubmitted = false;
  cdEmpresa = null;
  cdAtendimento = null;

  tiposAtendimento = [];
  empresas = [];
  unidades = [];
  tecnicos = [];


  form: any = {
    cdEmpresa: null,
    cdUnidade: null,
    cdTipoAtendimento: null,
    equipamentos: [],
    tecnicos: []
  }

  equipamento: any = {
    dsEquipamento: null,
    dsTipo: null,
    fgAtivo: true
  }

  tecnico: any = null;

  tiposEquipamento = [
    "GMG", "Nobreak"
  ]

  private readonly notifier: NotifierService;

  constructor(public chamadoService: ChamadoService, public notifierService: NotifierService, public route: ActivatedRoute, public clienteService: ClienteService, public atendimentoService: AtendimentoService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {

    this.carregarCombos().then((combos) => {
      this.route.queryParams.subscribe(params => {
        if (params['cdAtendimento']) {
          this.cdAtendimento = params['cdAtendimento'];
          this.form.cdAtendimento = parseInt(params['cdAtendimento']);
          this.carregarUnidades();
          this.detalhar();
        }
      })
    })



  }

  carregarCombos() {

    return new Promise((resolve, reject) => {
      this.chamadoService.carregarCombos().then((combos) => {
        resolve(combos);
        console.log(combos);
        this.tiposAtendimento = combos.tiposAtendimento;
        this.empresas = combos.empresas;
        this.tecnicos = combos.tecnicos;
      }).catch((fail) => {
        console.log(fail);
        reject(fail);
      })
    })


  }


  carregarUnidades() {
    this.clienteService.carregarUnidades(this.form.cdEmpresa).then((unidades) => {
      console.log(unidades);
      this.unidades = unidades;
      if (this.unidades.length == 1) {
        this.form.cdUnidade = unidades[0].cdUnidade;
      }
      console.log(this.form)
    })
  }


  addEquipamento() {

    if (this.form.equipamentos) {

      if (this.equipamento) {
        let equipamento = {
          dsEquipamento: this.equipamento.dsEquipamento,
          dsTipo: this.equipamento.dsTipo,
          fgAtivo: this.equipamento.fgAtivo
        }
        this.form.equipamentos.push(equipamento);
      }

    }

  }

  addTecnico() {

    let hasFound = false;

    if (this.form.tecnicos) {
      if (this.tecnico) {
        if(this.form.tecnicos.length > 0){
          this.form.tecnicos.forEach((item,i)=>{
            if(item.cdLogin == this.tecnico.cdLogin){
              hasFound = true;
            }
          })
        }

        if(!hasFound){
          this.form.tecnicos.push(this.tecnico);
        }

      }

    }

  }

  carregarEquipamentos() {

    if (!this.form.cdAtendimento) {

      if (this.form.cdTipoAtendimento == TipoAtendimento.PREVENTIVA || this.form.cdTipoAtendimento == TipoAtendimento.PREVENTIVA_E_CORRETIVA) {
        this.chamadoService.carregarEquipamentos(this.form.cdUnidade).then((equipamentos) => {

          this.form.equipamentos = [];

          if (equipamentos.length > 0) {
            equipamentos.forEach((item, i) => {
              let equip = {
                dsEquipamento: item.dsEquipamento,
                dsTipo: item.dsTipo,
                fgAtivo: true
              }
              this.form.equipamentos.push(equip);
            })
          }
        })
      }
    }

  }

  deletarEquipamento(i) {
    this.form.equipamentos.splice(i, 1);
  }

  salvar() {

    this.chamadoFormSubmitted = true;

    if (
      this.form.cdEmpresa && this.form.cdUnidade && this.form.cdTipoAtendimento && this.form.dsDescricao && this.form.equipamentos.length > 0 && this.form.tecnicos.length > 0 && this.form.dtAtendimento && this.form.hrAtendimento
    ) {

      console.log(this.form);

      this.atendimentoService.salvar(this.form).then((results) => {

        if (results) {
          this.form.cdAtendimento = results.cdAtendimento;
        }

        this.notifier.notify("success", "Dados salvos com sucesso.");
      })
    }
    else {
      this.notifier.notify("error", "Há campos de preenchimento obrigatório em branco");
    }

  }

  detalhar() {
    this.chamadoService.detalhar(this.cdAtendimento).then((chamado) => {
      this.form = chamado;

      if(!chamado.dtAtendimento){
        this.form.dtAtendimento = null;
      }

      if(!chamado.tecnicos){
        this.form.tecnicos = [];
      }

      this.carregarUnidades();
    })
  }

  confirmarAtendimento(){
    this.atendimentoService.confirmar(this.form.cdAtendimento).then((results)=>{
      this.notifier.notify("success", "Atendimento confirmado com sucesso!");
      this.detalhar();
    })
  }

  removerTecnico(i){
    this.form.tecnicos.splice(i,1);
  }

}
