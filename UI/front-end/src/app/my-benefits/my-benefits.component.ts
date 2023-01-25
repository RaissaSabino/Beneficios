import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Beneficiary } from '../beneficiary';
import { EventsBeneficiaryProduct } from '../eventsBeneficiaryProduct';


@Component({
  selector: 'app-my-benefits',
  templateUrl: './my-benefits.component.html',
  styleUrls: ['./my-benefits.component.css']
})
export class MyBenefitsComponent implements OnInit {

  userId : number;
  beneficiary: Beneficiary
  eventsBeneficiaryProduct: Array<EventsBeneficiaryProduct> = []
  dois: Array<EventsBeneficiaryProduct> = []

  constructor() { 

    this.userId = 0;

    

    this.beneficiary = {
      id : this.userId,
      name: "",
      edv: "",
      user: "",
      area: "",
      email: "",
      birthDate: "",
      thirdParty: false,
      inclusionDate: ""
    }

  }

  ngOnInit(): void {
    let token = localStorage.getItem('authToken')

    var data2 = JSON.stringify({
      
    });
    let self2 = this;
    var config2 = {
      method: 'get',
      url: 'http://localhost:5265/beneficiary/getById',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      data2 : data2
    };

    axios(config2)
    .then(function (response:any) {
      console.log(JSON.stringify(response.data));
      self2.beneficiary = response.data;
    })
    .catch(function (error:any) {
      console.log(error);
    });

    var data3 = JSON.stringify({
      
    });
    var config = {
      method: 'get',
      url: 'http://localhost:5265/eventsBeneficiaryProduct/get',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token 
      },
      data : data3
    };

    axios(config)
    .then(function (response:any) {
      // console.log(JSON.stringify(response.data));
      self2.dois = response.data;
      // self2.dois=self2.eventsBeneficiaryProduct
      var tamanho=self2.dois.length
      var date=new Date();
      for(var i=0; i<self2.dois.length;i++){
        console.log(self2.dois[i])
        var dataBanco=new Date(self2.dois[i].deliveredDate)
        var timeDiff = Math.abs(date.getTime() - dataBanco.getTime());
        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
        if(diffDays>=100 && self2.dois[i].deliveredDate != '0001-01-01T00:00:00'){
          console.log(i)
        }
        else{
          self2.eventsBeneficiaryProduct.push(self2.dois[i])
        }

      }
    })
    .catch(function (error:any) {
      console.log(error);
    });
  }

  

}
