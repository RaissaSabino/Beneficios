import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { EventsBeneficiary } from '../eventsBeneficiary';
import { Beneficiary } from '../beneficiary';
@Component({
  selector: 'app-third-party-page',
  templateUrl: './third-party-page.component.html',
  styleUrls: ['./third-party-page.component.css']
})
export class ThirdPartyPageComponent implements OnInit {
  cpf_edv = true;
  selected = ""
  beneficiary: Beneficiary;
  constructor() { 
    this.beneficiary={
      id :0,
    name: "",
    edv: "",
    user: "",
    area: "",
    email: "",
    birthDate: "",
    thirdParty: true,
    inclusionDate: ""
    }
  }
  eventsBeneficiary: Array<EventsBeneficiary> = []
  ngOnInit(): void {
    let token = localStorage.getItem('authToken')
    
    var data3 = JSON.stringify({
      
    });
    var config = {
      method: 'get',
      url: 'http://localhost:5265/eventsBeneficiary/getById',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      },
      data : data3
    };
    let self2 = this;
    axios(config)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
     self2.eventsBeneficiary = response.data;
      //console.log(self2.eventsBeneficiary);
    })
    .catch(function (error:any) {
      console.log(error);
    });
  }

  onChange(deviceValue: any) {
    this.cpf_edv = this.selected == "CPF"
  }

  ThirdParty(){
    let select = document.getElementById("select") as HTMLSelectElement;
    let option = select.options[select.selectedIndex];
    let nome = document.getElementById("nomevalue") as HTMLInputElement;
    let cpf = document.getElementById("cpfvalue") as HTMLInputElement;
    let edv = document.getElementById("edvvalue") as HTMLInputElement;
    let selectEvento = document.getElementById("selectEvento") as HTMLSelectElement;
    let optionEvento = selectEvento.options[selectEvento.selectedIndex];

    if(option.id == "cpf"){
      var data = JSON.stringify({
        "name" : nome?.value,        
        "cpf" : cpf?.value,
        "edv" : "",
        "user" : "",
        "area" : ""
      });
      let token = localStorage.getItem('authToken')
      var config = {
        method : 'post',
        url: 'http://localhost:5265/beneficiary/register/third/'+optionEvento.value,
        headers:{
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token 
        },
        data:data
      };
      let self=this;
      axios(config).then(function(response){
        self.ThirdPartyUpdate(response.data);
      }).catch(function(error){
        alert(error);
        console.log(error);
      });

    }
    else if(option.id == "edv"){
      this.getEdv(edv.value)
    }
  }

  ThirdPartyUpdate(id:number){
    let selectEvento = document.getElementById("selectEvento") as HTMLSelectElement;
    let optionEvento = selectEvento.options[selectEvento.selectedIndex];

    var data = JSON.stringify({
      
    });
    let token = localStorage.getItem('authToken')
      var config = {
        method : 'put',
        url: 'http://localhost:5265/beneficiary/update/third/'+optionEvento.value+'/'+id,
        headers:{
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token 
        },
        data:data
      };

      axios(config).then(function(response){
        alert("Terceiro atualizado!")
        window.location.reload();
        
      }).catch(function(error){
        alert(error);
        console.log(error);
      });
  }

  getEdv(edv:string){

    var data = JSON.stringify({
      "edv" : edv
    });

    let token = localStorage.getItem('authToken')
      var config = {
        method : 'get',
        url: 'http://localhost:5265/beneficiary/get/'+edv,
        headers:{
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token 
        },
        data:data
      };
      let self=this;
      axios(config).then(function(response){
        self.beneficiary=response.data
        self.updateEDV(self.beneficiary.id)
      }).catch(function(error){
        alert("EDV não encontrado");
        console.log(error);
      });

  }

  updateEDV(id:number){
    let selectEvento = document.getElementById("selectEvento") as HTMLSelectElement;
    let optionEvento = selectEvento.options[selectEvento.selectedIndex];
    var data = JSON.stringify({
      
    });
    let token = localStorage.getItem('authToken')
      var config = {
        method : 'put',
        url: 'http://localhost:5265/eventsbeneficiary/update/thirdEDV/'+optionEvento.value+'/'+id,
        headers:{
          'Content-Type':'application/json',
          'Authorization': 'Bearer ' + token 
        },
        data:data
      };

      axios(config).then(function(response){
        alert("Terceiro cadastrado");
        window.location.reload();
        // let nome = document.getElementById("nomevalue") as HTMLInputElement;
        // let cpf = document.getElementById("cpfvalue") as HTMLInputElement;
        // let edv = document.getElementById("edvvalue") as HTMLInputElement;
        // nome.innerText="";
        // cpf.innerText="";
        // edv.innerText="";
      }).catch(function(error){
        alert(error);
        console.log(error);
      });
  }
}
