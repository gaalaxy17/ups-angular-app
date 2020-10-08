import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private readonly notifier: NotifierService;

  constructor(private httpClient: HttpClient, private notifierService: NotifierService, private spinner: NgxSpinnerService) {
    this.notifier = notifierService;
  }

  carregarEndereco(cep): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {

      this.httpClient.get<any>(environment.VIA_CEP_API_ENDPOINT + '/' + cep + "/json")
        .subscribe((res) => {
          this.spinner.hide();
          resolve(res);
        }, error => {
          this.spinner.hide();
          this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
          reject(error);

        });


    }));
  };

  carregarCombos(): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {
      this.httpClient.get<any>(environment.API_ENDPOINT + "/empresa/combos/detalhe")
        .subscribe((res) => {
          this.spinner.hide();
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
          this.spinner.hide();
          this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
          reject(error);
        });
    }));
  };

  salvar(form): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {
      this.httpClient.post<any>(environment.API_ENDPOINT + "/empresa/salvar", form)
        .subscribe((res) => {
          this.spinner.hide();
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
          this.spinner.hide();
          this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
          reject(error);
        });
    }));
  };

  buscar(filtro): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {
      this.httpClient.post<any>(environment.API_ENDPOINT + "/empresa/buscar", filtro)
        .subscribe((res) => {
          this.spinner.hide();
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
          this.spinner.hide();
          this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
          reject(error);
        });
    }));
  };

  detalhar(cdEmpresa): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {
      this.httpClient.get<any>(environment.API_ENDPOINT + "/empresa/" + cdEmpresa)
        .subscribe((res) => {
          this.spinner.hide();
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
          this.spinner.hide();
          this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
          reject(error);
        });
    }));
  };

  carregarUnidades(cdEmpresa): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {
      this.httpClient.get<any>(environment.API_ENDPOINT + "/empresa/unidades/" + cdEmpresa)
        .subscribe((res) => {
          this.spinner.hide();
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
          this.spinner.hide();
          this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
          reject(error);
        });
    }));
  };


  mudarStatusUnidade(cdUnidade,fgAtivo): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {
      this.httpClient.get<any>(environment.API_ENDPOINT + "/empresa/alterarStatus/" + cdUnidade + "/" + fgAtivo)
        .subscribe((res) => {
          this.spinner.hide();
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
          this.spinner.hide();
          this.notifier.notify("error", "Ocorreu um erro inesperado, favor tentar novamente em alguns instantes.");
          reject(error);
        });
    }));
  };


}
