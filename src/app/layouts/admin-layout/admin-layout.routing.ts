import { Routes } from '@angular/router';
import { ChamadoConsultaComponent } from 'app/chamado/chamado-consulta/chamado-consulta.component';
import { ChamadoDetalheComponent } from 'app/chamado/chamado-detalhe/chamado-detalhe.component';
import { ClienteConsultaComponent } from 'app/cliente/cliente-consulta/cliente-consulta.component';
import { ClienteDetalheComponent } from 'app/cliente/cliente-detalhe/cliente-detalhe.component';
import { AuthGuard } from 'app/commons/auth.guard';
import { LoginComponent } from 'app/login/login.component';

import { HomeComponent } from '../../home/home.component';
import { AuthService } from '../../services/auth.service';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'cliente/consulta', component: ClienteConsultaComponent, canActivate: [AuthGuard] },
    { path: 'cliente/detalhe', component: ClienteDetalheComponent, canActivate: [AuthGuard] },
    { path: 'chamado/consulta', component: ChamadoConsultaComponent, canActivate: [AuthGuard] },
    { path: 'chamado/detalhe', component: ChamadoDetalheComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent }
];
