import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly notifier: NotifierService;

  constructor(private httpClient: HttpClient, private notifierService: NotifierService) {
    this.notifier = notifierService;
  }

  carregarEndereco(cep): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.httpClient.get<any>(environment.VIA_CEP_API_ENDPOINT + '/' + cep + "/json")
        .subscribe((res) => {
          resolve(res);
        }, error => {
          this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
          reject(error);
        });
    }));
  };

  carregarCombos(): Promise<any> {
    return new Promise(((resolve, reject) => {
      this.httpClient.get<any>(environment.API_ENDPOINT + "/empresa/combos/detalhe")
        .subscribe((res) => {
          if (!res.hasError) {
            resolve(res.data);
          }
          else {
            if (res.erro) {
              this.notifier.notify("error", res.erro);
              reject(res.erro)
            }
            else {
              this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
              reject(false);

            }
          }
        }, error => {
          this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
          reject(error);
        });
    }));
  };

}
