import { Component, OnInit, ViewChild } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { ClienteService } from 'app/services/cliente.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.css']
})
export class ClienteDetalheComponent implements OnInit {

  form: any = {
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
    nrDiaPrevisto: null,
    tecnicoPrevisto: null,
    fgAtivo: null
  }

  tecnicos = [];

  closeResult: any = '';

  private readonly notifier: NotifierService;

  constructor(public clienteService: ClienteService, public notifierService: NotifierService, public modalService: NgbModal) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.carregarCombos();
    
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

          if(results.uf){
            this.form.nmEstado = results.uf;
          }

          if(results.localidade){
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

          if(results.uf){
            this.item.nmEstado = results.uf;
          }

          if(results.localidade){
            this.item.nmCidade = results.localidade;
          }
        }

      })
    }
  }

  carregarCombos(){
    this.clienteService.carregarCombos().then((combos)=>{
      console.log(combos);
      this.tecnicos = combos.tecnicos;
    })
  }

  openModalDetalheEndereco(){


  }

  openModalDetalheUnidade(){
   
  }

  addUnidade(){

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
      fgAtivo: null
    }



  }

  salvarUnidade(){
    if(this.item){
      this.form.unidades.push(this.item);
      $("#modalDetalheUnidade").modal("hide");
    }
  }

  editarUnidade(u){
    this.item = u;
  }

}
