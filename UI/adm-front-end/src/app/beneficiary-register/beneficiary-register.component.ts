import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Events } from '../Events';
import { Product } from '../Product';

@Component({
  selector: 'app-beneficiary-register',
  templateUrl: './beneficiary-register.component.html',
  styleUrls: ['./beneficiary-register.component.css']
})
export class BeneficiaryRegisterComponent implements OnInit {
  array: Array<Product> = [];
  arrayProd: Array<Product> = [];
  arrayEventos: Array<Events> = [];

  constructor() { }

  ngOnInit(): void {
  }

  rollback(){
    history.back()
  }

  registerBeneficiary(){
    let edv = (document.getElementById('edv') as HTMLInputElement).value;
    let name = (document.getElementById('name') as HTMLInputElement). value;
    let area = (document.getElementById('area') as HTMLInputElement).value;
    let cpf = (document.getElementById('cpf') as HTMLInputElement).value;
    let birthDate = (document.getElementById('birthDate') as HTMLInputElement).value;
    let user = (document.getElementById('user') as HTMLInputElement).value;
    
    var data = JSON.stringify({
      "edv": edv,
      "name": name,
      "area": area,
      "cpf": cpf,
      "user": user,
      "birthDate": birthDate,
      "inclusionDate": "2022-07-21T14:41:08.866Z",
      "thirdParty": false
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:5265/beneficiary/register',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Benefiário registrado com sucesso!");
    })
    .catch(function (error) {
      alert(error);
      console.log(error);
    });
  }

  getEvents() {
    var config = {
      method: 'get',
      url: 'http://localhost:5265/events/getAll',
      headers: {},
      data: '',
    };
    var instance = this;
    axios(config)
      .then(function (response) {
        instance.arrayEventos = response.data;
        console.log(instance.arrayEventos);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getAll() {
    let eventId = (
      document.getElementById('eventIdPesquisa') as HTMLInputElement
    ).value;
    let instance = this;
    var data = JSON.stringify({
      eventId: eventId,
    });
    console.log(data);

    var config = {
      method: 'post',
      url: 'http://localhost:5265/product/productEventsPesquisa',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config).then(function (response: any) {
      instance.array = response.data;
      console.log(response.data);
    });
  }

  addProdList(a : Product) {
    if(this.arrayProd.includes(a)) alert("Produto já foi adicionado!")
    else this.arrayProd.push(a);
  }
  removeProdList(a : Product){
    const index = this.arrayProd.indexOf(a);
    this.arrayProd.splice(index,1)
  }
}
