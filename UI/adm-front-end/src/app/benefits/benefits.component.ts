import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { Data } from '@angular/router';
import axios from 'axios';
import { Product } from '../Product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.css']
})
export class BenefitsComponent implements OnInit {

  array: Array<Product> = [];
  detalhes: Product = { id: 1, name: "", unitCost: 1, eventosId: 1 };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    let EventId = Number(localStorage.getItem('eventId'));
    var instance = this
    var data = JSON.stringify({
      "eventID": EventId
    })

    var config = {
      method: 'post',
      url: 'http://localhost:5265/product/productEventsPesquisa',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response: any) {
        instance.array = response.data;
        console.log(response.data);
      })
  }

  rollback() {
    history.back();
  }

  productRegister() {
    let nome = (document.getElementById('nameAdicionar') as HTMLInputElement).value;
    let unitCost = (document.getElementById('unitCostAdicionar') as HTMLInputElement).value;
    let EventId = Number(localStorage.getItem('eventId'));
    let stock = Number((document.getElementById('stockAdicionar') as HTMLInputElement).value);

    var instance = this
    var data = JSON.stringify({
      name: nome,
      unitCost: unitCost,
      eventid: EventId
    });
    console.log(data)
    var config = {
      method: 'post',
      url: 'http://localhost:5265/product/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }
    axios(config)
      .then(function (response) {
        instance.addStock(stock,response.data);
      })
      .catch(function (error) {
        console.log(error);
        alert('Erro ao cadastrar produto\nPreencha corretamente os campos');
      });
  }

  addStock(stock :number, productId : number){
    var data = JSON.stringify({
      total : stock,
      productId : productId
    });
    console.log(data)


    var config = {
      method: 'post',
      url: 'http://localhost:5265/stock/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data
    }

    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert('Produto cadastrado com sucesso!');
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
      alert('Erro ao cadastrar Produto\nPreencha corretamente os campos');
    });
  }
  
  saveData(a: Product) {
    localStorage.setItem('productId', a.id.toString());
  }

  messageContent: string
  takeMessage(id: number) {
    this.messageContent = id.toString()
    console.log(this.messageContent)
  }

  mostraDetalhes(a: Product) {
    this.detalhes = a;
  }

  cancelAdd() {
  }
  
}