import { Component, OnInit } from '@angular/core';
import { Events } from '../Events';
import axios from 'axios';
@Component({
  selector: 'app-events-register',
  templateUrl: './events-register.component.html',
  styleUrls: ['./events-register.component.css'],
})
export class EventsRegisterComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  eventRegister() {
    let nome = (document.getElementById('nome') as HTMLInputElement).value;
    let descricao = (document.getElementById('descricao') as HTMLInputElement)
      .value;
    let dataInicio = (document.getElementById('dataInicio') as HTMLInputElement)
      .value;
    let dataFim = (document.getElementById('dataFim') as HTMLInputElement)
      .value;

    var data = JSON.stringify({
      name: nome,
      description: descricao,
      startDate: dataInicio,
      endDate: dataFim,
      isActive: false,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5265/events/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert('Evento Cadastrado com sucesso');
      })
      .catch(function (error) {
        console.log(error);
        alert('Erro ao Cadastrar Evento\nPreencha Corretamente os campos');
      });
  }
  
  rollback() {
    history.back();
  }
}
