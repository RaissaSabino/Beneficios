import { Component, OnInit } from '@angular/core';
import { Station } from '../Station';
import { stationProduct } from '../StationProdutcs';
import { Product } from '../Product';
import { Events } from '../Events';
import { StationRegisterComponent } from '../station-register/station-register.component';
import axios from 'axios';
import { ActivationEnd, Route, Router } from '@angular/router';
@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css'],
})
export class SeasonComponent implements OnInit {
  min:number = 0;
  max: number = 0;
  totalItems: number = 0;
  pages: number = 0;
  pagAtual:number = 1;
  itemsPerPage: number = 9;
  PagTotalArray: Array<number> = [];

  array: Array<Station> = [];
  detalhes: Station = { id: -1, ipAddress: '', description: '', isActive: '' };
  arrayProd: Array<stationProduct> = [];
  arrayEventos: Array<Events> = [];
  arrayProdList: Array<Product> = [];
  arrayProdEdit: Array<Product> = [];

  mostraDetalhes(a: Station) {
    this.detalhes = a;
    this.getAllProd(a.id);
    this.getEvents();
    this.getAllProdPesquisa();
  }

  constructor(private router: Router)
  {}

  ngOnInit(): void {
    if(localStorage.getItem("authTokenOwner")==null){
      this.router.navigate(['']);
    }
    this.getAll();

    var interval = setInterval(() =>{ 
      if(this.totalItems == 0){
        this.contArray();
      }
      else{
        clearInterval(interval);
      }
    }, 2000); //vai rodar a cada 2 segundos
    
    
    this.SetItemsPerPage();
    this.ChangeBtnState();
  }

  getAll() {
    let ip = (document.getElementById('ipPesquisa') as HTMLInputElement).value;
    let descricao = (
      document.getElementById('descPesquisa') as HTMLInputElement
    ).value;
    let status = (document.getElementById('statusPesquisa') as HTMLInputElement)
      .value;

    if (ip.length < 3) ip = '';
    if (descricao.length < 3) descricao = '';

    let instance = this;
    var data = JSON.stringify({
      ipAddress: ip,
      description: descricao,
      isActive: status,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5265/station/stationPesquisa',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config).then(function (response: any) {
      instance.array = response.data;
      console.log(response.data);

      if (instance.array != null)
        instance.array.forEach((Element) => {
          Element.isActive = Element.isActive ? 'Sim' : 'Não';
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

  getAllProd(id: number) {
    var config = {
      method: 'get',
      url: 'http://localhost:5265/stationProduct/getAll/' + id,
      headers: {},
      data: '',
    };
    var instance = this;
    axios(config)
      .then(function (response) {
        instance.arrayProd = response.data;
        console.log(instance.arrayProd);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getAllProdPesquisa() {
    let eventId = (
      document.getElementById('eventIdPesquisa') as HTMLInputElement
    ).value;
    if(eventId != ""){
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
        instance.arrayProdList = response.data;
        instance.arrayProdEdit.splice(0);
        instance.arrayProd.forEach((element) => {
          instance.arrayProdEdit.push(element.produtos);
        });
      });
    }
  }

  addProdList(a: Product) {
    let status = true;
    this.arrayProdEdit.forEach((element) => {
      if (element.name == a.name) status = false;
    });
    if (status) this.arrayProdEdit.push(a);
    else alert('Produto já existe na lista!!');
  }

  removeProdList(a: Product) {
    const index = this.arrayProdEdit.indexOf(a);
    this.arrayProdEdit.splice(index, 1);
  }

  EditStation() {
    let ipAddress = (
      document.getElementById('ipAddressEditar') as HTMLInputElement
    ).value;
    let description = (
      document.getElementById('descriptionEditar') as HTMLInputElement
    ).value;
    
    let active = false;
    if(this.detalhes.isActive == "Sim"){
      active = true;
    }    
    
    var data = JSON.stringify({
      id: this.detalhes.id,
      ipAddress: ipAddress,
      description: description,
      isActive : active
    });

    var config = {
      method: 'put',
      url: 'http://localhost:5265/station/update/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert('Sucesso!!');
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert('Erro!!');
      });

    console.log(data);
  }

  EditStationProduct() {
    this.EditStation();
     this.DeleteStationProduct();
    const arrP: Array<Product> = [];
    this.arrayProd.forEach((element) => {
      arrP.push(element.produtos);
    });    

    this.arrayProdEdit.forEach((element) => {
      if (arrP.includes(element) == false) {
        var data = JSON.stringify({
          idStation: this.detalhes.id,
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
      }
    });
  }

  takeMessage() {
    var data = JSON.stringify({
      id: this.detalhes.id,
      IpAddress: this.detalhes.ipAddress,
      Description: this.detalhes.description,
      isActive: this.detalhes.isActive == 'Sim' ? false : true,      
    });    
    var config = {
      method: 'put',
      url: 'http://localhost:5265/station/update/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert('Status Alterado com sucesso!!');
        window.location.reload();
      })
      .catch(function (error) {
        alert('Erro ao alterar Status!!');
        console.log(error);
      });
  }

  DeleteStationProduct() {
    this.arrayProd.forEach((element) => {
      if (this.arrayProdEdit.includes(element.produtos) == false) {
        var data = JSON.stringify({
          idStation: Number(this.detalhes.id),
          idProdutos: element.produtos.id,
        });
        var config = {
          method: 'delete',
          url: 'http://localhost:5265/stationProduct/delete',
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
      }
    });
  }

  async contArray(){
    this.totalItems = this.array.length;
    console.log("total: ", this.totalItems);
    this.pages = Math.ceil(this.totalItems/this.itemsPerPage);

    if(this.totalItems == 0){
      this.pagAtual = 0;
    }
  }

  ProxPag(){
    if(this.pagAtual != this.pages){
      this.pagAtual++;
    }

    this.loadPage();
  }

  PagAnt(){
    if(this.pagAtual != 1){
      this.pagAtual--;
    }

    this.loadPage();
  }

  loadPage(){
    this.min = (this.pagAtual-1)*this.itemsPerPage;
    this.max = (this.pagAtual)*this.itemsPerPage;

    this.ChangeBtnState();
  }

  ChangeBtnState(){
    let btnProx = document.querySelector("#ProxBtn");
    let btnAnt = document.querySelector("#AntBtn");

    // btnProx
    if(this.pagAtual == this.pages){
      btnProx?.setAttribute("style", " pointer-events: none ; opacity: 0.5;");
      
    }else{
      btnProx?.setAttribute("style", "pointer-events: all;");
    }

    // btnAnt
    if(this.pagAtual == 1 || this.pagAtual == 0){
      btnAnt?.setAttribute("style", "pointer-events: none; opacity: 0.5;");
    }else{
      btnAnt?.setAttribute("style", "pointer-events: all;");
    }
  }

  SetItemsPerPage(){
    this.itemsPerPage = Number((document.getElementById('showSelector') as HTMLInputElement).value);

    // this.itemsPerPage = Number(showSelector.value);
    console.log(this.itemsPerPage);
    
    this.loadPage();
    this.CalculatePages();
  }

  CalculatePages(){
    this.pages = Math.ceil(this.totalItems/this.itemsPerPage);

    this.PagTotalArray = [];

    for(let i = 1; i <= this.pages; i++){
      this.PagTotalArray.push(i);
    }
    console.log("pages:",this.pages);
  }

  selectPage(page: number){
    this.pagAtual = page;
    this.loadPage();
  }
}
