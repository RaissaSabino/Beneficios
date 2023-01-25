import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-adm-login',
  templateUrl: './adm-login.component.html',
  styleUrls: ['./adm-login.component.css']
})
export class AdmLoginComponent implements OnInit {

  
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("authTokenOwner")!=null){
      this.router.navigate(['event-query']);
    }
  }

  login(){
    let login = document.getElementById("edv") as HTMLInputElement;
    let datanasc = document.getElementById("data") as HTMLInputElement;
    
    let datanova=datanasc.value
    console.log(datanova);
    


    console.log(datanasc.value)
    var data = JSON.stringify({
      "cpf": "",
      "birthDate": datanova,
      "inclusionDate": "2022-07-13T17:04:57.793Z",
      "thirdParty": true,
      "Edv":login?.value,
      "Area":"",
      "Name":"",
      "User":""
    });
    let self = this;
    var config = {
      method: 'post',
      url: 'http://localhost:5265/beneficiary/loginadm',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response:any) {
      localStorage.setItem('authTokenOwner',response.data);
      self.router.navigate(['event-query']);
      // window.location.reload();
    })
    .catch(function (error:any) {
      console.log(error);
    });
  }

}
