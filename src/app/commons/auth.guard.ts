import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthService, private router: Router) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let user = await this.auth.getUser();

        if (user) {
            // logged in so return true
            return true;
        }

        // redireciona para o login para realizar a autenticacao
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        // this.alertService.presentAlert('Atenção', 'Você precisa estar logado para acessar esse conteúdo.');
        return false;
    }
}