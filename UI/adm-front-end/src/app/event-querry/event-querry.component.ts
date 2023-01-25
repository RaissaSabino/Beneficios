import { Component, OnInit } from '@angular/core';
import { Events } from '../Events';
import axios from 'axios';
import { contains } from 'jquery';
import { interval } from 'rxjs';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-event-querry',
  templateUrl: './event-querry.component.html',
  styleUrls: ['./event-querry.component.css'],
})
export class EventQuerryComponent implements OnInit {
  array: Array<Events> = [];
  detalhes: Events = { id: -1, name: "", description: "", startDate: new Date(), endDate: new Date(), isActive: "" }

  min:number = 0;
  max: number = 0;
  totalItems: number = 0;
  pages: number = 0;
  pagAtual:number = 1;
  itemsPerPage: number = 9;
  PagTotalArray: Array<number> = [];

  constructor(private router: Router) { }
  
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
 
  async contArray(){
    this.totalItems = this.array.length;
    console.log("total: ", this.totalItems);
    this.pages = Math.ceil(this.totalItems/this.itemsPerPage);
    if(this.totalItems == 0){
      this.pagAtual = 0;
    }
  }

  saveData(a: Events) {
    localStorage.setItem('eventId', a.id.toString());
  }

  messageContent: string

  takeMessage() {    
    var data = JSON.stringify({
      "Name": this.detalhes.name,
      "Description": this.detalhes.description,
      "StartDate":this.detalhes.startDate,
      "EndDate": this.detalhes.endDate,
      "isActive": this.detalhes.isActive == "Sim" ? false : true
    });
  
    console.log(data);
            
    var config = {
      method: 'put',
      url: 'http://localhost:5265/events/update/'+Number(this.detalhes.id),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('authTokenOwner')
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Status Alterado com sucesso")
      window.location.reload();
    })
    .catch(function (error) {
      localStorage.removeItem("authTokenOwner")
        window.location.reload()
      alert("Erro ao alterar Status!!")
    });
  }

  mostraDetalhes(a: Events) {
    this.detalhes = a
  }

  editarEvento(){
    let nome = (document.getElementById("nameEditar") as HTMLInputElement).value;
    let description = (document.getElementById("descriptionEditar") as HTMLInputElement).value;
    let dataInicio = (document.getElementById("startDateEditar") as HTMLInputElement).value;
    let dataFim = (document.getElementById("endDateEditar") as HTMLInputElement).value;    
    let active = false;
    if(this.detalhes.isActive == "Sim"){
      active = true
    }

    var data = JSON.stringify({
      "Name": nome,
      "Description": description,
      "StartDate": dataInicio,
      "EndDate": dataFim,
      "isActive": active
    });
        
    var config = {
      method: 'put',
      url: 'http://localhost:5265/events/update/'+Number(this.detalhes.id),
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('authTokenOwner')
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      alert("Evento Editado Com Sucesso!!")
      window.location.reload();
    })
    .catch(function (error) {
        localStorage.removeItem("authTokenOwner")
        window.location.reload()
      alert("Erro ao Editar o Evento!!")
    });
    }

   getAll() {

    let nomeEvento = (document.getElementById("nomeEventoPesquisa") as HTMLInputElement).value;
    let status = (document.getElementById("statusPesquisa") as HTMLInputElement).value;
    if (nomeEvento.length < 3) nomeEvento = "";
    let instance = this;
    var data = JSON.stringify({
      "name": nomeEvento,
      "isActive": status
    })

    var config = {
      method: 'post',
      url: 'http://localhost:5265/events/eventsPesquisa',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('authTokenOwner')
      },
      data: data
    };

    axios(config)
      .then(function (response: any) {
        instance.array = response.data;
        console.log(response.data);

        if (instance.array != null)
          instance.array.forEach(Element => {
            Element.isActive = Element.isActive ? "Sim" : "Não";
          })

      })
      .catch(function (error) {
        localStorage.removeItem("authTokenOwner")
        window.location.reload()
      });
  }

  cancelAdd() {
     $('#Adicionar').on('hidden.bs.modal', function (e) {
       $(this).find('input:text').val('');
       $(this).find('select').val('');
      let dataInicio = (document.getElementById('startDateAdicionar') as HTMLInputElement)
      let dataFim = (document.getElementById('endDateAdicionar') as HTMLInputElement)
      dataInicio.valueAsDate = new Date("")
      dataFim.valueAsDate = new Date("")
     })

  }


  eventRegister() {
    let nome = (document.getElementById('nameAdicionar') as HTMLInputElement).value;
    let descricao = (document.getElementById('descriptionAdicionar') as HTMLInputElement)
      .value;
    let dataInicio = (document.getElementById('startDateAdicionar') as HTMLInputElement)
      .value;
    let dataFim = (document.getElementById('endDateAdicionar') as HTMLInputElement)
      .value;
    let status = (document.getElementById('statusAdiconar') as HTMLInputElement)
      .value;

    var data = JSON.stringify({
      name: nome,
      description: descricao,
      startDate: dataInicio,
      endDate: dataFim,
      isActive: status == "true" ? true : false,
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
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert('Erro ao Cadastrar Evento\nPreencha Corretamente os campos');
      });
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
    if(this.pagAtual == this.pages ){
      btnProx?.setAttribute("style", "pointer-events: none;  opacity: 0.5;");
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
  }

  selectPage(page: number){
    this.pagAtual = page;
    this.loadPage();
  }
}
