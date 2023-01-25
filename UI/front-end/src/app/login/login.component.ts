import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("authToken")!=null){
      this.router.navigate(['mybenefits']);

    }
  }

  login(){
    let login = document.getElementById("cpf") as HTMLInputElement;
    let datanasc = document.getElementById("data") as HTMLInputElement;
    
    let datanova=datanasc.value
    console.log(datanasc.value)
    var data = JSON.stringify({
      "cpf": login?.value,
      "birthDate": datanova,
      "inclusionDate": "2022-07-13T17:04:57.793Z",
      "thirdParty": true,
      "Edv":"",
      "Area":"",
      "Name":"",
      "User":""
    });
    let self = this;
    var config = {
      method: 'post',
      url: 'http://localhost:5265/beneficiary/login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response:any) {
      localStorage.setItem('authToken',response.data);
      self.router.navigate(['mybenefits']);
    })
    .catch(function (error:any) {
      console.log(error);
    });

    // var config2 = {
    //   method: 'post',
    //   url: 'http://localhost:5062/owner/api',
    //   headers: { 
    //     'Content-Type': 'application/json'
    //   },
    //   data : data
    // };

    // axios(config2)
    // .then(function (response:any) {
    //   localStorage.setItem('authOwner',response.data);
    //   localStorage.removeItem('authToken');
    //   self.router.navigate(['']);
    // })
    // .catch(function (error:any) {
    //   console.log(error);
    // });

  }

}
