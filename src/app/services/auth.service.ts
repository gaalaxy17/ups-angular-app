import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isAuthenticated = false;
    private readonly notifier: NotifierService;

    constructor(
        private httpClient: HttpClient,
        private notifierService: NotifierService,
        private router: Router,
        private spinner: NgxSpinnerService
    ) {
        this.notifier = notifierService;

    }

    checkToken() {
        // token expirado?? tratar cenario, aqui ou no service
        var data = JSON.parse(localStorage.getItem(USER_KEY));
    }


    login(username, password): Observable<any> {

        this.spinner.show();

        const body = {
            dsUser: username,
            dsPass: password
        }

        console.log(body);

        return this.httpClient.post<any>(environment.API_ENDPOINT + '/auth',
            body)
            .pipe(
                map(res => {

                    this.spinner.hide();

                    if (!res.hasError) {
                        var user = res.data;
                        console.log(user);
                        localStorage.setItem(USER_KEY, JSON.stringify(user));
                        this.isAuthenticated = true;
                        return user;
                    }
                    else {
                        // alert(res.erro);

                        if (Object.entries(res.erro).length != 0) {
                            this.notifier.notify("error", res.erro);
                            throw throwError(new Error(res.error));
                        }
                        else{
                            this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
                            throw throwError(new Error(res.error));
                        }


                    }


                })
            );
    }

    logout() {
        localStorage.clear();
        this.router.navigateByUrl("/login");
    }

    getUserAsObservable(): Observable<any> {
        return from(this.getUser());
    }

    getUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            var key = JSON.parse(localStorage.getItem(USER_KEY));
            if (key) {
                resolve(key);
            }
            else {
                resolve(null);
            }
        })
    }

    getPerfil(): Promise<any> {

        return new Promise((resolve, reject) => {
            var key = JSON.parse(localStorage.getItem(USER_KEY));

            if (key) {
                resolve(key.cdPerfil);
            }
            else {
                reject(-1);
            }
        })


    }
}
