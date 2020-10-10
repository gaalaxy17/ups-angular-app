import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private readonly notifier: NotifierService;

  constructor(private httpClient: HttpClient, private notifierService: NotifierService, private spinner: NgxSpinnerService) {
    this.notifier = notifierService;
  }

  carregarCombos(): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {
      this.httpClient.get<any>(environment.API_ENDPOINT + "/chamado/combosDetalhe")
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
      this.httpClient.post<any>(environment.API_ENDPOINT + "/chamado/buscar",filtro)
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

  carregarEquipamentos(cdUnidade): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {
      this.httpClient.get<any>(environment.API_ENDPOINT + "/chamado/equipamentos/" + cdUnidade)
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
      this.httpClient.post<any>(environment.API_ENDPOINT + "/chamado/salvar", form)
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

  detalhar(cdAtendimento): Promise<any> {

    this.spinner.show();

    return new Promise(((resolve, reject) => {
      this.httpClient.get<any>(environment.API_ENDPOINT + "/chamado/detalhar/" + cdAtendimento)
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
