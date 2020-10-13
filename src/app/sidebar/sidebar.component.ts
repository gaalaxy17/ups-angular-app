import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'pe-7s-graph', class: '' },
    { path: '/cliente/consulta', title: 'Clientes',  icon:'pe-7s-portfolio', class: '' },
    { path: '/chamado/consulta', title: 'Chamados',  icon:'pe-7s-albums', class: '' },
    { path: '/atendimento/consulta', title: 'Atendimentos',  icon:'pe-7s-note2', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
