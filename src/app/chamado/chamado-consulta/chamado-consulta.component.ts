import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chamado-consulta',
  templateUrl: './chamado-consulta.component.html',
  styleUrls: ['./chamado-consulta.component.css']
})
export class ChamadoConsultaComponent implements OnInit {

  
  public page = 1;
  public pageSize = 10;

  filtro: any = {
    nmEmpresa: null,
    nrDocumento: null
  }

  clientes: [];

  constructor() { }

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {

    // this.clienteService.buscar(this.filtro).then((results) => {
    //   this.clientes = results;
    //   console.log(results);
    // })

  }

}
