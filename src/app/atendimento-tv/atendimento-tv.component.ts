import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AtendimentoService } from 'app/services/atendimento.service';
import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-atendimento-tv',
  templateUrl: './atendimento-tv.component.html',
  styleUrls: ['./atendimento-tv.component.css']
})
export class AtendimentoTvComponent implements OnInit {

  constructor(public atendimentoService: AtendimentoService, public router:Router) { }

  atendimentos: any = [];

  private updateSubscription: Subscription;

  ngOnInit(): void {
    this.carregarDados();

    this.updateSubscription = interval(15000).subscribe(
      (val) => { this.carregarDados()
    })

  }

  voltar(){
    this.updateSubscription.unsubscribe();
    this.router.navigateByUrl("/dashboard");
  }

  carregarDados(){
    this.atendimentoService.getAtendimentos().then((results)=>{
      console.log(results);
      this.atendimentos = results;
    })
  }

}
