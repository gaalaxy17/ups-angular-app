import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'app/services/cliente.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.css']
})
export class ClienteConsultaComponent implements OnInit {

  public page = 1;
  public pageSize = 10;

  filtro: any = {
    nmEmpresa: null,
    nrDocumento: null
  }

  public clientes: [];

  constructor(public clienteService: ClienteService) { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {

    this.clienteService.buscar(this.filtro).then((results) => {
      this.clientes = results;
      console.log(results);
    })

  }

}
