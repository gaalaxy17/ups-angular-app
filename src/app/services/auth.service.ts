import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { NotifierService } from 'angular-notifier';

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
        private notifierService: NotifierService
    ) {
        this.notifier = notifierService;

    }

    checkToken() {
        // token expirado?? tratar cenario, aqui ou no service
        var data = JSON.parse(localStorage.getItem(USER_KEY));
    }


    login(username, password): Observable<any> {
        const body = {
            dsUser: username,
            dsPass: password
        }

        console.log(body);

        return this.httpClient.post<any>(environment.API_ENDPOINT + '/auth',
            body)
            .pipe(
                map(res => {
                    console.log(res);

                    if (!res.hasError) {
                        var user = res.data;
                        localStorage.setItem(USER_KEY, JSON.stringify(user));
                        this.isAuthenticated = true;
                        return user;
                    }
                    else {
                        // alert(res.erro);
                        this.notifier.notify("error", res.erro);
                        throw throwError(new Error(res.error));
                    }


                })
            );
    }

    logout() {
        localStorage.clear();
    }

    showNotification() {

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
                reject("Erro");
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
