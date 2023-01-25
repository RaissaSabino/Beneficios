import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Beneficiary } from '../beneficiary';
import { StationProduct } from '../stationProduct';
import { Route, Router } from '@angular/router';
import { EventsBeneficiary } from '../eventsBeneficiary';

@Component({
  selector: 'app-read-cpf-edv',
  templateUrl: './read-cpf-edv.component.html',
  styleUrls: ['./read-cpf-edv.component.css']
})
export class ReadCpfEdvComponent implements OnInit {

  nomeado: Beneficiary
  eventsBeneficiary: Array<EventsBeneficiary> = [];
  stationProduct: Array<StationProduct> = [];
  eventos: Array<Number> = [];
  third: boolean = false;
  igual: boolean = false;

  constructor(private router: Router) {


    this.nomeado = {
      id : 0,
      name: "",
      edv: "",
      cpf: "",
      user: "",
      inclusionDate: "",
      area: "",
      birthDate: "",
      thirdParty: false
    }
   }

  ngOnInit(): void {

    localStorage.removeItem("terceiro");
    localStorage.removeItem("empresa");


  }

  verifica(){

    let digitado = document.getElementById('cpf_edv') as HTMLInputElement;

    let valor = digitado.value;

    localStorage.setItem("cpf", valor);

    if(valor.length > 10){
      var config = {
        method: 'get',
        url: 'http://localhost:5265/eventsbeneficiary/getcpf/' + valor,
        headers: {},
        data: '',
      };
  
      var instance = this;
      axios(config)
        .then(function (response:any) {
          console.log(response.data);
          instance.eventsBeneficiary = response.data;
          if(instance.eventsBeneficiary.length == 0){
            alert("O CPF não está indicado por nenhum colaborador!")
          }
          for(let event of instance.eventsBeneficiary){
            if(event.beneficiarioNomeadoThirdParty == true){
              instance.third = false;
              localStorage.setItem("empresa", "false");
              localStorage.setItem("terceiro", "true");
              instance.router.navigate(['receive-product']);
            }
            else{
              instance.third = true;
            }
          }
          if(instance.third){
            alert("Você não pode entrar por CPF pois é um colaborador!");
          }
        })
        .catch(function (error:any) {
          console.log(error);
        });
    }
    else{
      var config2 = {
        method: 'get',
        url: 'http://localhost:5265/eventsbeneficiary/getcpfBeneficiario/' + valor,
        headers: {},
        data: '',
      };
  
      var instance = this;
      axios(config2)
        .then(function (response:any) {
          console.log(response.data);
          instance.eventsBeneficiary = response.data;
          if(instance.eventsBeneficiary.length == 0){
            alert("Você digitou um edv invalido");
          }
          else{
            for(var i = 0; i < instance.eventsBeneficiary.length; i++){
              console.log("e pra mostra o edv do beneficiario " + instance.eventsBeneficiary[i].beneficiario.edv);
              console.log("e pra mostra o valor " + valor);
              if(instance.eventsBeneficiary[i].beneficiario.edv != valor)
              {
                if(instance.eventsBeneficiary[i].edvIndicado == valor){
                instance.igual = false;
                break;
                }
              }
              else {
                instance.igual = true;
              }
  
            }
  
            if(instance.igual == false){
              localStorage.setItem("terceiro", "true");
              localStorage.setItem("empresa", "true");
              instance.router.navigate(['receive-product']);
            }
            else{
              localStorage.setItem("empresa", "true");
              localStorage.setItem("terceiro", "false");
              instance.router.navigate(['receive-product']);
            }
          }
          
        })
        .catch(function (error:any) {
          console.log(error);
        });
    }

  }

  // async pegaIp(){
  //   try{
  //     const response = await axios.get('https://ipinfo.io/json');
  //     console.log(response);
  //   } catch (error){
  //     console.error(error);
  //   }
  // }

  // verificaCerto(id : number){

  //   var config = {
  //     method: 'get',
  //     url: 'http://localhost:5265/beneficiary/getcpf/' + valor,
  //     headers: {},
  //     data: '',
  //   };

  //   var instance = this;
  //   axios(config)
  //     .then(function (response:any) {
  //       console.log(response.data);
  //       instance.nomeado = response.data;
  //       if(instance.nomeado.id == id){
  //         instance.router.navigate(['receive-product']);
  //       }
  //     })
  //     .catch(function (error:any) {
  //       console.log(error);
  //     });
  // }
//instance.nomeado.thirdParty == true && 

  }

