import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { environment } from 'environments/environment';


@Injectable({
    providedIn: 'root'
})
/**
 * Intercepta todas as requisicoes HTTP, adiciona cabecalhos default e realiza logica de autenticacao
 */
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

            return this.authService.getUserAsObservable()
                .pipe(
                    mergeMap((user: any) => {
                        if (user && user.dsToken && req.url.split('/')[2] == environment.API_ENDPOINT.split('/')[2]) {
                            req = req.clone({
                                setHeaders: {
                                    Authorization: `${user.dsToken}`
                                }
                            });
                        }
                        return next.handle(req);
                    }
                    )
                ).pipe(
                    catchError((error: HttpErrorResponse) => {
                        let errorMessage = '';
                        if (error.error instanceof ErrorEvent) {
                            // client-side error
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            // server-side error
                            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                        }
 
                        console.log(errorMessage);

                        return throwError(error);
                    })
                )
                ;
        

    }


}
