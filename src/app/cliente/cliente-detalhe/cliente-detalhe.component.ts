import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ClienteService } from 'app/services/cliente.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as uuid from 'uuid';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AtendimentoService } from 'app/services/atendimento.service';
// import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {

  cdCliente = null;
  empresaFormSubmitted = false;

  form: any = {
    nmEmpresa: null,
    nrDocumento: null,
    nrInscricaoEstadual: null,
    nrCep: null,
    nmRua: null,
    nrNumero: null,
    dsComplemento: null,
    nmBairro: null,
    nmEstado: null,
    nmCidade: null,
    unidades: []
  }

  item: any = {
    nmUnidade: null,
    nrCep: null,
    nmRua: null,
    nrNumero: null,
    dsComplemento: null,
    nmBairro: null,
    nmEstado: null,
    nmCidade: null,
    nmContatoCli: null,
    nrTelefone: null,
    nrCelular: null,
    fgClienteContrato: false,
    nrDuracaoContrato: null,
    dtInicioContrato: null,
    nrDiaPrevisto: null,
    tecnicoPrevisto: null,
    fgAtivo: true,
    equipamentos: []
  }

  equipamento: any = {
    dsEquipamento: null,
    dsTipo: null,
    fgAtivo: true
  }

  tiposEquipamento = [
    "GMG", "Nobreak", "Infraestrutura"
  ]


  tecnicos = [];

  closeResult: any = '';

  private readonly notifier: NotifierService;

  constructor(public clienteService: ClienteService, public notifierService: NotifierService, public modalService: NgbModal, public route: ActivatedRoute, public atendimentoService: AtendimentoService) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {

    this.carregarCombos();

    this.route.queryParams.subscribe(params => {
      if (params['cdCliente']) {
        this.cdCliente = params['cdCliente'];
        this.detalhar();
      }
    })

  }

  carregarEnderecoEmpresaByCep() {

    if (this.form.nrCep) {
      this.clienteService.carregarEndereco(this.form.nrCep).then((results) => {
        console.log(results);
        if (results.erro) {
          this.notifier.notify("error", "O CEP inserido é inválido");
        }
        else {
          if (results.logradouro) {
            this.form.nmRua = results.logradouro;
          }
          if (results.bairro) {
            this.form.nmBairro = results.bairro;
          }

          if (results.uf) {
            this.form.nmEstado = results.uf;
          }

          if (results.localidade) {
            this.form.nmCidade = results.localidade;
          }
        }

      })
    }
  }

  carregarEnderecoUnidadeByCep() {

    if (this.item.nrCep) {

      this.clienteService.carregarEndereco(this.item.nrCep).then((results) => {
        console.log(results);
        if (results.erro) {
          this.notifier.notify("error", "O CEP inserido é inválido");
        }
        else {
          if (results.logradouro) {
            this.item.nmRua = results.logradouro;
          }
          if (results.bairro) {
            this.item.nmBairro = results.bairro;
          }

          if (results.uf) {
            this.item.nmEstado = results.uf;
          }

          if (results.localidade) {
            this.item.nmCidade = results.localidade;
          }
        }

      })
    }
  }

  carregarCombos() {
    this.clienteService.carregarCombos().then((combos) => {
      console.log(combos);
      this.tecnicos = combos.tecnicos;
    })
  }

  openModalDetalheEndereco() {


  }

  openModalDetalheUnidade() {

  }

  addUnidade() {

    const id = uuid.v4();

    this.item = {
      nmUnidade: null,
      nrCep: null,
      nmRua: null,
      nrNumero: null,
      dsComplemento: null,
      nmBairro: null,
      nmEstado: null,
      nmCidade: null,
      nmContatoCli: null,
      nrTelefone: null,
      nrCelular: null,
      fgClienteContrato: false,
      nrDuracaoContrato: null,
      nrDiaPrevisto: null,
      tecnicoPrevisto: null,
      fgAtivo: true,
      equipamentos: [],
      uuid: id
    }

  }

  addEquipamento(item) {

    if (item.equipamentos) {

      if (this.equipamento) {
        let equipamento = {
          dsEquipamento: this.equipamento.dsEquipamento,
          dsTipo: this.equipamento.dsTipo,
          fgAtivo: this.equipamento.fgAtivo
        }
        item.equipamentos.push(equipamento);
      }

    }

  }

  salvarUnidade() {
    if (this.item) {

      if (this.form.unidades.length > 0) {

        let foundItem = false;

        this.form.unidades.forEach((item, i) => {
          if (item.uuid && this.item.uuid) {

            if (item.uuid == this.item.uuid) {

              foundItem = true;

              item.nmUnidade = this.item.nmUnidade;
              item.nrCep = this.item.nrCep;
              item.nmRua = this.item.nmRua;
              item.nrNumero = this.item.nrNumero
              item.dsComplemento = this.item.dsComplemento
              item.nmBairro = this.item.nmBairro
              item.nmEstado = this.item.nmEstado
              item.nmCidade = this.item.nmCidade
              item.nmContatoCli = this.item.nmContatoCli
              item.nrTelefone = this.item.nrTelefone
              item.nrCelular = this.item.nrCelular
              item.fgClienteContrato = this.item.fgClienteContrato
              item.nrDuracaoContrato = this.item.nrDuracaoContrato
              item.nrDiaPrevisto = this.item.nrDiaPrevisto
              item.tecnicoPrevisto = this.item.tecnicoPrevisto
              item.fgAtivo = this.item.fgAtivo
              item.equipamentos = this.item.equipamentos;
            }

          }

          else {
            if (item.cdUnidade == this.item.cdUnidade) {
              foundItem = true;

              item.nmUnidade = this.item.nmUnidade;
              item.nrCep = this.item.nrCep;
              item.nmRua = this.item.nmRua;
              item.nrNumero = this.item.nrNumero
              item.dsComplemento = this.item.dsComplemento
              item.nmBairro = this.item.nmBairro
              item.nmEstado = this.item.nmEstado
              item.nmCidade = this.item.nmCidade
              item.nmContatoCli = this.item.nmContatoCli
              item.nrTelefone = this.item.nrTelefone
              item.nrCelular = this.item.nrCelular
              item.fgClienteContrato = this.item.fgClienteContrato
              item.nrDuracaoContrato = this.item.nrDuracaoContrato
              item.nrDiaPrevisto = this.item.nrDiaPrevisto
              item.tecnicoPrevisto = this.item.tecnicoPrevisto
              item.fgAtivo = this.item.fgAtivo
              item.equipamentos = this.item.equipamentos;
            }
          }

        })

        if (!foundItem) {
          this.form.unidades.push(this.item);
        }

      } else {
        this.form.unidades.push(this.item);
      }

      $("#modalDetalheUnidade").modal("hide");
    }
  }

  editarUnidade(u) {
    this.item = u;
  }

  removerUnidade(index) {
    this.form.unidades.splice(index, 1);
  }

  removerEquipamento(item, index) {
    item.equipamentos.splice(index, 1);
  }

  salvar() {

    this.empresaFormSubmitted = true;

    if (
      this.form.nmEmpresa && this.form.nrDocumento && this.form.nrCep
      && this.form.nmRua && this.form.nrNumero && this.form.nmBairro
      && this.form.nmCidade && this.form.nmEstado

    ) {

      this.clienteService.salvar(this.form).then((results) => {

        if (results) {
          this.form.cdEmpresa = results.cdEmpresa;
        }

        this.notifier.notify("success", "Dados salvos com sucesso.");
      })
    }
    else {
      this.notifier.notify("error", "Há campos de preenchimento obrigatório em branco");
    }


  }

  detalhar() {
    this.clienteService.detalhar(this.cdCliente).then((empresa) => {
      this.form = empresa;
      console.log(empresa);
    })
  }

  inativarUnidade(unidade) {
    this.clienteService.mudarStatusUnidade(unidade.cdUnidade, 0).then((results) => {
      this.detalhar();
      console.log(results);
    })
  }

  reativarUnidade(unidade) {
    this.clienteService.mudarStatusUnidade(unidade.cdUnidade, 1).then((results) => {
      this.detalhar();
      console.log(results);
    })
  }

  gerarAtendimentosContrato(unidade) {

    this.empresaFormSubmitted = true;

    if (
      this.form.nmEmpresa && this.form.nrDocumento && this.form.nrCep
      && this.form.nmRua && this.form.nrNumero && this.form.nmBairro
      && this.form.nmCidade && this.form.nmEstado

    ) {

      this.clienteService.salvar(this.form).then((results) => {

        if (results) {
          this.form.cdEmpresa = results.cdEmpresa;
        }

        this.atendimentoService.gerarAtendimentosContrato(unidade.cdUnidade).then((results) => {
          this.notifier.notify("success", "Atendimentos gerados com sucesso.");
        })

        // this.notifier.notify("success", "Dados salvos com sucesso.");
      })
    }
    else {
      this.notifier.notify("error", "Há campos de preenchimento obrigatório em branco");
    }


  }

}
