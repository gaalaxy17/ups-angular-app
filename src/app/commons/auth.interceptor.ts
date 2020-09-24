import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';


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
        if (this.authService.isAuthenticated) {
            return this.authService.getUserAsObservable()
                .pipe(
                    mergeMap((user: any) => {
                        if (user && user.token) {
                            req = req.clone({
                                setHeaders: {
                                    Authorization: 'Bearer ' + `${user.token}`
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
        else{
            return next.handle(req);
        }

    }


}
