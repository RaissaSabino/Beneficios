import { Component, OnInit } from '@angular/core';
import { BeneficiaryNomeado } from '../BeneficiaryNomeado';
import { Beneficiary } from '../Beneficiary';
import axios from 'axios';
import { Estoque } from '../Estoque';
import { Events } from '../Events';
import { Product } from '../Product';
import { EventBeneficiaryProduct } from '../EventBeneficiaryProduct';


@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css'],
})
export class BeneficiariesComponent implements OnInit {
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

  array: Array<BeneficiaryNomeado> = [];
  AddBeneficiario: Beneficiary =  this.beneficiarioVasio;
  arrayProd: Array<Estoque> = [];
  detalhes: Beneficiary = this.beneficiarioVasio;
  arrayEventos: Array<Events> = [];
  arrayProdList: Array<Product> = [];
  arrayProdEdit: Array<Product> = [];
  arrayQuantity : Array<EventBeneficiaryProduct> = [];

  min:number = 0;
  max: number = 0;
  totalItems: number = 0;
  pages: number = 0;
  pagAtual:number = 1;
  itemsPerPage: number = 9;
  PagTotalArray: Array<number> = [];

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
    this.getEvents();
    this.getAllProdPesquisa();
  }

  getAll() {
    let edv = (document.getElementById('edvPesquisa') as HTMLInputElement)
      .value;
    let nome = (document.getElementById('nomePesquisa') as HTMLInputElement)
      .value;
    let eventId = localStorage.getItem('eventId');

    if (nome.length < 3) nome = '';
    if (edv.length < 3) edv = '';

    let instance = this;
    var data = JSON.stringify({
      edv: edv,
      name: nome,
      eventId: eventId,
    });

    var config = {
      method: 'post',
      url: 'http://localhost:5265/eventsbeneficiary/beneficiaryPesquisa',
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

  messageContent: string;
  takeMessage(edv:string,id:number) {

    var data = JSON.stringify({
          idEvento:id,
          edvBeneficiary:edv  
    })

    var config = {
      method: 'delete',
      url:
        'http://localhost:5265/eventsbeneficiary/delete',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    var instance = this;
    axios(config)
      .then(function (response) {
        alert("Deletado com Sucesso!!")
        window.location.reload();
      })
      .catch(function (error) {
        alert("Erro ao Deletar!!")
      });    
  }

  mostraDetalhes(a: Beneficiary) {
    console.log(a);
    this.detalhes = a;
    this.getAllProd(a.id);
    this.getAllQuantity(a.id);
  }

  rollback() {
    history.back();
  }

  getAllProd(id: number) {
    let eventId = localStorage.getItem('eventId');
    var config = {
      method: 'get',
      url:
        'http://localhost:5265/eventsBeneficiaryProduct/get/'+eventId+'/'+id,
      headers: {},
      data: '',
    };
    var instance = this;
    axios(config)
      .then(function (response) {
        instance.arrayProd = response.data;
        console.log(instance.arrayProd);
        instance.arrayProdEdit.splice(0);
        instance.arrayProd.forEach((element) => {
          instance.arrayProdEdit.push(element.produto);
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getAllQuantity(id : number){
    let eventId = localStorage.getItem('eventId');
    var config = {
      method: 'get',
      url:
        'http://localhost:5265/eventsBeneficiaryProduct/get/'+eventId+'/'+id,
      headers: {},
      data: '',
    };
    var instance = this;
    axios(config)
      .then(function (response) {
        instance.arrayQuantity =  response.data;          
      })
      .catch(function (error) {
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

  getAllProdPesquisa() {
    let eventId = localStorage.getItem('eventId');
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
        instance.arrayProdEdit.push(element.produto);
      });
    });
  }

  getAllBeneficiario() {
    let edv = (document.getElementById('edvPesquisaAdd') as HTMLInputElement).value;
    if (edv.length > 3) {
      let instance = this;
      var data = JSON.stringify({
        edv: edv,
        name: "",
        eventId: "",
        adm: "",
        isActive : "true"     
      });

      var config = {
        method: 'post',
        url: 'http://localhost:5265/beneficiary/beneficiaryPesquisa',
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          console.log(response.data);
              if(response.data.length != 0)
                instance.AddBeneficiario = response.data[0];
              else {
                alert("Beneficiário não encontrado!!");
                instance.AddBeneficiario = instance.beneficiarioVasio;
              }

    
        }) .catch(function (error) {
          console.log(error);
        });
       
        
    }else{
      this.AddBeneficiario = this.beneficiarioVasio;
    }
  }

  verificaBeneficiarioEvento(){
    this.arrayProdEdit.splice(0);
    this.array.forEach(element => {
      if(element.beneficiario.edv == this.AddBeneficiario.edv && element.beneficiario.edv!= "") 
      {
        alert("Beneficiário já está cadastrado no evento!");
        this.AddBeneficiario = this.beneficiarioVasio;
      }
    });
  }

  addProdList(a: Product) {
    let status = true
    this.arrayProdEdit.forEach(element => {
      if (element.name == a.name) status = false
    });
    if(status) this.arrayProdEdit.push(a);
    else alert("Produto já existe na lista!!")   
  }
  
  removeProdList(a: Product) {
    const index = this.arrayProdEdit.indexOf(a);
    this.arrayProdEdit.splice(index, 1);
  }

  AddBeneficiary() {

    let edv = (document.getElementById('edvAdd') as HTMLInputElement).value;
    let name = (document.getElementById('beneficiarioAdd') as HTMLInputElement).value;
    let cpf = (document.getElementById('cpfAdd') as HTMLInputElement).value;
    let area = (document.getElementById('areaAdd') as HTMLInputElement).value;
    let user = (document.getElementById('usuarioAdd') as HTMLInputElement).value;
    let inclusionDate = new Date(Date.now());
    let birthDate = (document.getElementById('aniversarioAdd') as HTMLInputElement).value


    var data = JSON.stringify({
      name: name,
      edv: edv,
      cpf: cpf,
      inclusionDate: inclusionDate,
      user: user,
      thirdParty: false,
      area: area,
      birthDate: birthDate,
    });

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

  addEventBeneficiary() {
    let edv = this.AddBeneficiario.edv;
    let EventId = Number(localStorage.getItem('eventId'));
    var data = JSON.stringify({
      idEvento: EventId,
      edvBeneficiary: edv
    });

    console.log(data);

    var config = {
      method: 'post',
      url: 'http://localhost:5265/eventsbeneficiary/register',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };
    const instance = this;
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        instance.registerProducts(edv);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  registerProducts( edv: string){
    let eventId = Number(localStorage.getItem('eventId'));
    this.DeleteStationProduct();
    var htmlColetion = (document.getElementsByClassName('quantidade') as HTMLCollectionOf<HTMLInputElement>);   
    var listQuantidades :Array<number> = [];
    var cont = 0;
    for (let i = 0; i < htmlColetion.length; i++) {
      if( Number(htmlColetion[i].value) != 0) {
        listQuantidades.push(Number(htmlColetion[i].value))
        console.log(listQuantidades);
      } 
    }
    
    
   
    this.arrayProdEdit.forEach(element => {
      var data = JSON.stringify({
        quantity : listQuantidades[cont], 
        deliveredDate :  new Date("0001-01-01"),
        productId : element.id,
        edv : edv,
        eventId : eventId
     
      });
      cont++;
      console.log(data);
      
      var config = {
        method: 'post',
        url: 'http://localhost:5265/eventsBeneficiaryProduct/register',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    });
    
  }

  cancelAdd() {
    $('#Adicionar').on('hidden.bs.modal', function (e) {
      $(this).find('input:text').val('');
      let dataAniver = (document.getElementById('aniversarioAdd') as HTMLInputElement)
      dataAniver.valueAsDate = new Date("")
    })

  }

  DeleteStationProduct() {
    this.arrayProd.forEach((element) => {
        var data = JSON.stringify({
          idEventBeneficiary: this.arrayQuantity[0].eventosBeneficiario.id,
          idProduct: element.produto.id,
        });
        var config = {
          method: 'delete',
          url: 'http://localhost:5265/eventsBeneficiaryProduct/delete',
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
