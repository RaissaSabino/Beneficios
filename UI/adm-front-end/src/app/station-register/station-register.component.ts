import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Events } from '../Events';
import { Product } from '../Product';
@Component({
  selector: 'app-station-register',
  templateUrl: './station-register.component.html',
  styleUrls: ['./station-register.component.css'],
})
export class StationRegisterComponent implements OnInit {
  array: Array<Product> = [];
  arrayProd: Array<Product> = [];
  arrayEventos: Array<Events> = [];

  constructor() {}

  ngOnInit(): void {
    this.getEvents();
    this.getAll();
  }

  registerStation() {
    let ipAddress = (document.getElementById('ipAddress') as HTMLInputElement)
      .value;
    let description = (
      document.getElementById('description') as HTMLInputElement
    ).value;
    let Active = document.getElementById('isActive') as HTMLInputElement;
    let isActive;

    if (Active.checked) {
      isActive = true;
    } else {
      isActive = false;
    }

    var data = JSON.stringify({
      ipAddress: ipAddress,
      description: description,
      isActive: isActive,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5265/station/register',
      data: data,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    var instance = this;
    axios(config)
      .then(function (response) {
        instance.registerProducts(response.data.stationId);
        alert('Estação registrada!');
        window.location.reload();
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  }

  registerProducts(idStation: number) {
    this.arrayProd.forEach((element) => {
      var data = JSON.stringify({
        idStation: idStation,
        idProdutos: element.id,
      });
      var config = {
        method: 'post',
        url: 'http://localhost:5265/stationProduct/register',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
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
        var comparaEventoAtivo : Array<Events> = response.data;
        if (comparaEventoAtivo != null){
          comparaEventoAtivo.forEach((Element) => {
            if(Element.isActive)
            instance.arrayEventos.push(Element);
          });
        }
        }).catch(function (error) {
        console.log(error);
      });
  }

  getAll() {
    let eventId = (
      document.getElementById('eventosPesquisa') as HTMLInputElement
    ).value;
    if (eventId != '') {
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
  }

  addProdList(a: Product) {
    let status = true;
    this.arrayProd.forEach((element) => {
      if (element.name == a.name) status = false;
    });
    if (status) this.arrayProd.push(a);
    else alert('Produto já existe na lista!!');
  }
  removeProdList(a: Product) {
    const index = this.arrayProd.indexOf(a);
    this.arrayProd.splice(index, 1);
  }
}
