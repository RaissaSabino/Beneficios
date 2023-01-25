import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Observable, VirtualTimeScheduler } from 'rxjs';
import { EventsBeneficiaryProduct } from '../eventsBeneficiaryProduct';
import { Stock } from '../stock';
import { IpServiceService } from '../ip-service.service';

@Component({
  selector: 'app-receive-product',
  templateUrl: './receive-product.component.html',
  styleUrls: ['./receive-product.component.css']
})
export class ReceiveProductComponent implements OnInit {
  // tratativa de erros com o modal
  // entre com o nome dos erros que deseja tratar
  messageContent : any; 
  takeMessage(){
    this.messageContent = 'ok'
  }

  ipAddress: string | null= "";
  valor: string | null = localStorage.getItem('cpf');
  eventsBeneficiaryProduct: Array<EventsBeneficiaryProduct> = []
  nomeTerceiro: string = ""
  nome: string = ""
  empresa: boolean = true;
  terceiro: boolean = false;
  tem: boolean = false;
  arrProduto: Array<number> = [];
  arrProdutoNovo: Array<number> = [];
  arrQtdProdutos: Array<number> = [];
  arrQtdProdutosNovo: Array<number> = [];
  arrNomes: Array<string> = [];
  arrNovo: Array<EventsBeneficiaryProduct> = [];
  arrIds: Array<number> = [];
  arrIdsNovo: Array<number> = [];
  stock: Array<Stock> = [];
  prodStock: Array<number> = [];
  changeStock: Array<number> = [];
  quantiaStock: Array<number> = [];
  quantiaInicialStock: Array<number> = [];
  arrIdProdStock: Array<number> = [];
  todos: boolean = false;

  cont: number = 0;

  constructor(private ip:IpServiceService ) { 


  }

  ngOnInit(): void {

    localStorage.removeItem("ip");

    if(localStorage.getItem("empresa") == "true" && localStorage.getItem("terceiro") == "true") {
      this.empresa = true;
      this.terceiro = true;

      console.log(this.empresa);
      console.log(this.terceiro);
    }

    if(localStorage.getItem("empresa") == "false" && localStorage.getItem("terceiro") == "true") {
      this.empresa = false;
      this.terceiro = true;

      console.log(this.empresa);
      console.log(this.terceiro);
    }
    if(localStorage.getItem("empresa") == "true" && localStorage.getItem("terceiro") == "false"){
      this.empresa = true;
      this.terceiro = false;

      console.log(this.empresa);
      console.log(this.terceiro);
    }

    if(this.empresa && this.terceiro){
      var config = {
        method: 'get',
        url: 'http://localhost:5265/eventsBeneficiaryProduct/getedv/' + this.valor ,
        headers: {},
        data: '',
      };
  
      var instance = this;
      axios(config)
        .then(function (response:any) {
          console.log(response.data);
          instance.eventsBeneficiaryProduct = response.data;
          for(let item of instance.eventsBeneficiaryProduct){
            if(item.eventosBeneficiario.beneficiarioNomeado != null){
              instance.nomeTerceiro = item.nomeTerceiro;
            }
              instance.nomeTerceiro = item.nomeTerceiro;
              instance.nome = item.nomeBeneficiario;
              instance.arrProduto.push(item.produto.id);
              instance.arrQtdProdutos.push(item.quantity);
              instance.arrNomes.push(item.produto.name);
              instance.arrIds.push(item.id);
            

            console.log(instance.nomeTerceiro);
          }
        })
        .catch(function (error:any) {
          console.log(error);
        });
    }
    if (this.empresa == false && this.terceiro) {
      var config = {
        method: 'get',
        url: 'http://localhost:5265/eventsBeneficiaryProduct/getcpf/' + this.valor,
        headers: {},
        data: '',
      };
  
      var instance = this;
      axios(config)
        .then(function (response:any) {
          console.log(response.data);
          instance.eventsBeneficiaryProduct = response.data;
          for(let item of instance.eventsBeneficiaryProduct){
            if(item.eventosBeneficiario.beneficiarioNomeado != null){
              instance.nomeTerceiro = item.nomeTerceiro;
            }
            
              instance.nomeTerceiro = item.nomeTerceiro;
              instance.nome = item.nomeBeneficiario;
              instance.arrProduto.push(item.produto.id);
              instance.arrQtdProdutos.push(item.quantity);
              instance.arrNomes.push(item.produto.name);
              instance.arrIds.push(item.id);
            
          }
          
        })
        .catch(function (error:any) {
          console.log(error);
        });
    }

    if(this.empresa && !this.terceiro){
      var config = {
        method: 'get',
        url: 'http://localhost:5265/eventsBeneficiaryProduct/getedv/' + this.valor,
        headers: {},
        data: '',
      };
  
      var instance = this;
      axios(config)
        .then(function (response:any) {
          console.log(response.data);
          instance.eventsBeneficiaryProduct = response.data;
          for(let item of instance.eventsBeneficiaryProduct){
            if(item.eventosBeneficiario.beneficiarioNomeado != 0){
              instance.nomeTerceiro = item.nomeTerceiro;
            }
            
              instance.nomeTerceiro = item.nomeTerceiro;
              instance.nome = item.nomeBeneficiario;
              instance.arrProduto.push(item.produto.id);
              instance.arrQtdProdutos.push(item.quantity);
              instance.arrNomes.push(item.produto.name);
              instance.arrIds.push(item.id);
            
          }
        })
        .catch(function (error:any) {
          console.log(error);
        });
    }
    
  }


  diminui(id:number, idEvent: number){
    var indice = this.arrIds.indexOf(idEvent);

    var indiceNovo = this.arrProdutoNovo.indexOf(idEvent);

    // console.log(id);
    // console.log(indice); SESSAO DEBUG COM BUGS DE REMOVER
    // console.log(indiceNovo);
    console.log(this.arrQtdProdutosNovo);

    if(this.arrQtdProdutosNovo[indiceNovo]-1 > 0){
      this.arrQtdProdutosNovo[indiceNovo] = this.arrQtdProdutosNovo[indiceNovo]-1
    }
    else{
      this.arrQtdProdutosNovo.splice(indiceNovo,1,0);
    }
    
    if(this.arrQtdProdutosNovo[indiceNovo] == 0){

      this.arrNovo.splice(indiceNovo, 1)
      this.arrProdutoNovo.splice(indiceNovo, 1)
      this.arrQtdProdutosNovo.splice(indiceNovo, 1);

      if(this.arrQtdProdutosNovo.length < 1){
        this.tem = false;
      }

      return this.eventsBeneficiaryProduct[indice].quantity+=1;
    }

    if(this.qtdAdd(id, idEvent) >= 1){

      return this.eventsBeneficiaryProduct[indice].quantity+=1;
    }
    
    return this.eventsBeneficiaryProduct[indice].quantity;
  }

  addTodos(ids: Array<number>){
    if(this.todos == true){
      this.todos = false;
      this.tem = false;

      for(var i = 0; i < ids.length; i++){
        this.arrNovo.splice(0,1);
        this.arrProdutoNovo.splice(0,1);
        this.arrQtdProdutosNovo.splice(0, 1);

        this.eventsBeneficiaryProduct[i].quantity = this.arrQtdProdutos[i];
      }
    }
    else if(this.todos == false){
      this.todos = true;
      this.tem = true;

      for(var i = 0; i < ids.length; i++){
        
        if(this.arrNovo.includes(this.eventsBeneficiaryProduct[i])){

          var indice = this.arrProdutoNovo.indexOf(ids[i]);

          this.arrQtdProdutosNovo.splice(indice, 1, this.arrQtdProdutosNovo[indice]+this.eventsBeneficiaryProduct[i].quantity);
          this.eventsBeneficiaryProduct[i].quantity = 0
        }
        else{
          if(this.eventsBeneficiaryProduct[i].quantity != 0){
            this.arrNovo.push(this.eventsBeneficiaryProduct[i]);
            this.arrProdutoNovo.push(this.eventsBeneficiaryProduct[i].id)
            this.arrQtdProdutosNovo.push(this.eventsBeneficiaryProduct[i].quantity);
            this.eventsBeneficiaryProduct[i].quantity = 0;
          }
        }
      }
    }

  }

  add(value: number, id : number){

    value--;

    if(value <= -1){
      return alert("Você não possui mais produtos desse tipo para adicionar");
    }
    else{
      
    var indice = this.arrIds.indexOf(id);

    var indiceNovo = this.arrProdutoNovo.indexOf(id);

    var inicial = this.arrQtdProdutos[indice];
    
    var resultado = inicial - this.eventsBeneficiaryProduct[indice].quantity+1

    this.eventsBeneficiaryProduct[indice].quantity = value
    

    if(this.arrNovo.includes(this.eventsBeneficiaryProduct[indice])){
     this.arrQtdProdutosNovo.splice(indiceNovo, 1, resultado);
    //  this.arrQtdProdutosNovo.push(resultado);
     //SESSAO DE DEBUG COM BUGS DE ADICIONAR E REMOVER
    //  console.log(resultado);
    //   console.log(this.arrProdutoNovo); 
    //  console.log(this.arrQtdProdutosNovo);
    }
    else{
     this.arrNovo.push(this.eventsBeneficiaryProduct[indice]);
     this.arrProdutoNovo.push(this.eventsBeneficiaryProduct[indice].id);
     indiceNovo = this.arrProdutoNovo.indexOf(id);
     this.arrQtdProdutosNovo.push(resultado);
     //SESSAO DE DEBUG COM BUGS DE ADICIONAR E REMOVER
     console.log(this.arrNovo);
      console.log(this.arrProdutoNovo); 
      console.log(this.arrQtdProdutosNovo);
    }

    this.tem = true;

    return this.eventsBeneficiaryProduct[indice].quantity
    }


  }

  mostraQuantidade(id : number){
    
    var indice = this.arrIds.indexOf(id);
    
    return this.eventsBeneficiaryProduct[indice].quantity
  }

  nomeAdd(id: number){
    var indice = this.arrProduto.indexOf(id);

    return this.arrNomes[indice]
  }

  qtdAdd(id: number, idEvent: number){
    var indice = this.arrProduto.indexOf(id);

    var indiceEvent = this.arrIds.indexOf(idEvent);

    var indiceNovo = this.arrProdutoNovo.indexOf(idEvent);

    var inicial = this.arrQtdProdutos[indiceEvent];

    return inicial - this.arrNovo[indiceNovo].quantity
  }


  edit(numeros: Array<number>){

    var agora = new Date();
    
    for(var i = 0; i < numeros.length; i++){



      if(this.eventsBeneficiaryProduct[i].quantity == 0){

        var data = JSON.stringify({
          "quantity": this.eventsBeneficiaryProduct[i].quantity,
          "unitCost": 0,
          "deliveredDate": agora,
          "deliveredQuantity": this.arrQtdProdutos[i] + this.eventsBeneficiaryProduct[i].deliveredQuantity,
          "eventsBeneficiary": {
            "evento": {
              "name": "",
              "description": "",
              "startDate": agora,
              "endDate": agora,
              "isActive": true
            },
            "beneficiary": {
              "name": "",
              "edv": "",
              "cpf": "",
              "inclusionDate": agora,
              "user": "",
              "thirdParty": true,
              "area": "",
              "birthDate": agora
            },
            "beneficiaryNominees": 0
          },
          "product": {
            "name": "",
            "events": {
              "name": "",
              "description": "",
              "startDate": agora,
              "endDate": agora,
              "isActive": true
            }
          },
          "deliveredBeneficiary": {
            "name": "",
            "edv": "",
            "cpf": "",
            "inclusionDate": agora,
            "user": "",
            "thirdParty": true,
            "area": "",
            "birthDate": agora
          }
        })
    
        var config ={
          method: 'put',
          url: 'http://localhost:5265/eventsBeneficiaryProduct/update/' + numeros[i],
          headers: { 'Content-Type': 'application/json' },
          data : data
        };
        let instance = this;
        axios(config).then(function (response) {
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });

      }
      else{

        var indefinida = new Date("0001-01-01");

        var data = JSON.stringify({
          "quantity": this.eventsBeneficiaryProduct[i].quantity,
          "unitCost": 0,
          "deliveredDate": indefinida,
          "deliveredQuantity": (this.arrQtdProdutos[i] - this.eventsBeneficiaryProduct[i].quantity) + this.eventsBeneficiaryProduct[i].deliveredQuantity,
          "eventsBeneficiary": {
            "evento": {
              "name": "",
              "description": "",
              "startDate": agora,
              "endDate": agora,
              "isActive": true
            },
            "beneficiary": {
              "name": "",
              "edv": "",
              "cpf": "",
              "inclusionDate": agora,
              "user": "",
              "thirdParty": true,
              "area": "",
              "birthDate": agora
            },
            "beneficiaryNominees": 0
          },
          "product": {
            "name": "",
            "events": {
              "name": "",
              "description": "",
              "startDate": agora,
              "endDate": agora,
              "isActive": true
            }
          },
          "deliveredBeneficiary": {
            "name": "",
            "edv": "",
            "cpf": "",
            "inclusionDate": agora,
            "user": "",
            "thirdParty": true,
            "area": "",
            "birthDate": agora
          }
        })
    
        var config ={
          method: 'put',
          url: 'http://localhost:5265/eventsBeneficiaryProduct/update/' + numeros[i],
          headers: { 'Content-Type': 'application/json' },
          data : data
        };
        let instance = this;
        axios(config).then(function (response) {
          
        })
        .catch(function (error) {
          console.log(error);
        });

      }

    }


    var config2 ={
      method: 'get',
      url: 'http://localhost:5265/stock/getAll',
      headers: { 'Content-Type': 'application/json' },
      data : ''
    };
    let instance = this;
    axios(config2).then(function (response) {
      console.log(response.data)
      instance.stock = response.data;
      for(var i = 0; i < instance.stock.length; i++){
        instance.prodStock.push(instance.stock[i].product.id);
      }
      console.log(instance.arrProduto);
      console.log(instance.prodStock);
      instance.updateStock(instance.arrProduto, instance.stock);
    })
    .catch(function (error) {
      console.log(error);
    });


  }
    
  
updateStock(idsProdutos: Array<number>, stocks: Array<Stock>){

  this.quantiaStock = [];
  this.quantiaInicialStock = [];

  for(var i = 0; i < idsProdutos.length; i++){

    var quantiaInicialProduto, quantiaDiminuir, quantiaDecidida

    var indiceProd = this.prodStock.indexOf(idsProdutos[i]);

    quantiaInicialProduto = stocks[indiceProd].currentStock;

    quantiaDiminuir = this.arrQtdProdutos[i] - this.eventsBeneficiaryProduct[i].quantity

    if(this.changeStock.includes(indiceProd))
    {
      var indiceQuantiaNova = this.quantiaInicialStock.indexOf(quantiaInicialProduto)

      quantiaDecidida = this.quantiaStock[indiceQuantiaNova] - quantiaDiminuir

      this.quantiaStock.splice(indiceQuantiaNova, 1, quantiaDecidida)

      console.log(this.quantiaStock)
      console.log(this.quantiaInicialStock)
    }
    else{
      this.changeStock.push(indiceProd)
    
      quantiaDecidida = quantiaInicialProduto - quantiaDiminuir

      this.quantiaStock.push(quantiaDecidida);
      this.quantiaInicialStock.push(quantiaInicialProduto);
      this.arrIdProdStock.push(idsProdutos[i]);

      console.log(this.quantiaStock)
      console.log(this.arrIdProdStock)
      console.log(this.quantiaInicialStock)
    }

  }


  for(var i = 0; i < this.quantiaStock.length; i++){

    var data2 = JSON.stringify({
      "currentStock":  this.quantiaStock[i]
    })

    console.log(this.arrProduto);
  
  
    var config2 ={
      method: 'put',
      url: 'http://localhost:5265/stock/update/' + this.arrIdProdStock[i],
      headers: { 'Content-Type': 'application/json' },
      data : data2
    };
    axios(config2).then(function (response) {
      console.log(response.data);
      window.location.reload();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

}

}
