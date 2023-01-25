import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { BeneficiaryNomeado } from '../BeneficiaryNomeado';
import { Beneficiary } from '../Beneficiary';
@Component({
  selector: 'app-adm-beneficiary',
  templateUrl: './adm-beneficiary.component.html',
  styleUrls: ['./adm-beneficiary.component.css']
})
export class AdmBeneficiaryComponent implements OnInit {

  array : Array<Beneficiary> = []
  min:number = 0;
  max: number = 0;
  totalItems: number = 0;
  pages: number = 0;
  pagAtual:number = 1;
  itemsPerPage: number = 9;
  PagTotalArray: Array<number> = [];
  beneficiarioVasio: Beneficiary = {
    id: -1,
    name: '',
    edv: '',
    cpf: '',
    inclusionDate: new Date(''),
    user: '',
    area: '',
    birthDate: new Date(''),
    adm : '',
    isActive:''
  };
  detalhes : Beneficiary = this.beneficiarioVasio;

  constructor() { }

  ngOnInit(): void {
    this.getAll();
    var interval = setInterval(() =>{ 
      if(this.totalItems == 0){
        this.contArray();
      }
      else{
        clearInterval(interval);
      }
    }, 2000); //vai rodar a cada 2 segundos
    
    this.ChangeBtnState();
    this.SetItemsPerPage();
  }


  cancelAdd() {
    $('#CadastraBeneficiario').on('hidden.bs.modal', function (e) {
      $(this).find('input:text').val('');
      let dataAniver = (document.getElementById('aniversarioAdd') as HTMLInputElement)
      dataAniver.valueAsDate = new Date("")
    })

  }


  mostraDetalhes(a: Beneficiary) {
    console.log(a);
    this.detalhes = a;
  }

  rollback() {
    history.back();
  }

  AddBeneficiary() {

    let edv = (document.getElementById('edvAdd') as HTMLInputElement).value;
    let name = (document.getElementById('beneficiarioAdd') as HTMLInputElement).value;
    let cpf = (document.getElementById('cpfAdd') as HTMLInputElement).value;
    let area = (document.getElementById('areaAdd') as HTMLInputElement).value;
    let user = (document.getElementById('usuarioAdd') as HTMLInputElement).value;
    let inclusionDate = new Date(Date.now());
    let birthDate = (document.getElementById('aniversarioAdd') as HTMLInputElement).value;
    let adm = (document.getElementById('statusAdd') as HTMLInputElement).value == 'true'? true : false;

    var data = JSON.stringify({
      name: name,
      edv: edv,
      cpf: cpf,
      inclusionDate: inclusionDate,
      user: user,
      thirdParty: false,
      area: area,
      birthDate: new Date (birthDate),
      adm : adm,
      isActive:true
    });

    console.log(data);
    
    var config = {
      method: 'post',
      url: 'http://localhost:5265/beneficiary/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  takeMessage() {            
    var data = JSON.stringify({      
      name: this.detalhes.name,
      edv: this.detalhes.edv,
      cpf: this.detalhes.cpf,
      user:this.detalhes.user,
      area: this.detalhes.area, 
      adm: this.detalhes.adm == 'ADM' ? true : false,
      isActive: this.detalhes.isActive == 'Sim' ? false : true,      
    });    
    var config = {
      method: 'put',
      url: 'http://localhost:5265/beneficiary/update/',
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

  EditBeneficiary(){
    let active = false;
    if(this.detalhes.isActive == "Sim"){
      active = true;
    }
    let edv = (document.getElementById('edvEdit') as HTMLInputElement).value;
    let name = (document.getElementById('beneficiarioEdit') as HTMLInputElement).value;
    let cpf = (document.getElementById('cpfEdit') as HTMLInputElement).value;
    let area = (document.getElementById('areaEdit') as HTMLInputElement).value;
    let user = (document.getElementById('usuarioEdit') as HTMLInputElement).value;
    let birthDate = (document.getElementById('aniversarioEdit') as HTMLInputElement).value;
    let adm = (document.getElementById('statusEdit') as HTMLInputElement).value == 'true'? true : false;

    var data = JSON.stringify({
      name: name,
      edv: edv,
      cpf: cpf,
      user: user,
      area: area,
      birthDate: new Date (birthDate),
      adm : adm,
      isActive: active
    });

    console.log(data);
    
    var config = {
      method: 'put',
      url: 'http://localhost:5265/beneficiary/update',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  DeleteBeneficiary(){
    var data = JSON.stringify({
      Edv : this.detalhes.edv,
      Cpf: this.detalhes.cpf,
      Area: this.detalhes.area,
      Name: this.detalhes.name,
      User: this.detalhes.user,
    });

    console.log(data)
    var config = {
      method: 'delete',
      url: 'http://localhost:5265/beneficiary/delete',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Beneficiário Deletado")
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  getAll() {
    let edv = (document.getElementById('edvPesquisa') as HTMLInputElement)
      .value;
    let nome = (document.getElementById('nomePesquisa') as HTMLInputElement)
      .value;
    let eventId = localStorage.getItem('eventId');

    let isAdm = (document.getElementById('admPesquisa') as HTMLInputElement).value;

    let isActive = (document.getElementById('ativoPesquisa') as HTMLInputElement).value;


    if (nome.length < 3) nome = '';
    if (edv.length < 3) edv = '';

    let instance = this;
    var data = JSON.stringify({
      edv: edv,
      name: nome,
      eventId: eventId,
      adm : isAdm,
      isActive: isActive,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5265/beneficiary/beneficiaryPesquisa',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config).then(function (response: any) {
      instance.array = response.data;
      console.log(instance.array);
      
      if (instance.array != null)
          instance.array.forEach(Element => {
            Element.adm = Element.adm ? "ADM" : "Público";
            Element.isActive = Element.isActive ? "Sim" : "Não";
          })
      
      console.log(response.data);
    });
  }


  
  async contArray(){
    this.totalItems = this.array.length;
    console.log("total: ", this.totalItems);
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
      btnProx?.setAttribute("style", "pointer-events: none;  opacity: 0.5;");
    }else{
      btnProx?.setAttribute("style", "pointer-events: all;");
    }

    // btnAnt
    if(this.pagAtual == 1){
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
