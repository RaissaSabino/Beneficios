import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Route, Router } from '@angular/router';
import { Beneficiary } from '../beneficiary';
import { EventsBeneficiary } from '../eventsBeneficiary';

@Component({
  selector: 'app-read-badge',
  templateUrl: './read-badge.component.html',
  styleUrls: ['./read-badge.component.css']
})
export class ReadBadgeComponent implements OnInit {

  eventsBeneficiary: Array<EventsBeneficiary> = [];
  numeros: string | null = "";
  edv: string = "";

  constructor(private router: Router) {


   }

  ngOnInit(): void {

    
    localStorage.removeItem("terceiro");
    localStorage.removeItem("empresa");

    document?.addEventListener('keydown', (event) => {
      var numberPattern = /\d+/g;
      if (event.key.match(numberPattern)) {
        this.numeros = this.numeros + event.key
        if (this.numeros.length == 6) {
          var cracha = document.getElementById("cracha") as HTMLInputElement;

          cracha.value = this.numeros;

          this.numeros = "";

          this.cracha();

        }
      }
    })


  }


  // scan()
  // {
  //      cordova.plugins.barcodeScanner.scan(
  //     function (result) {
  //     var qrc = result.text; 
  //         alert("We got a barcode\n" +
  //             "Result: " + result.text + "\n" +
  //              "Format: " + result.format + "\n" +
  //              "Cancelled: " + result.cancelled + "\n" +
  //               "QRC: " + qrc); 
  //           }, 
  //           function (error) {
  //               alert("Scanning failed: " + error);
  //           });
  // }

  // test2(){
  //   this.nfc.addNdefListener(() => {
  //     console.log('successfully attached ndef listener');
  //   }, (err: any) => {
  //     console.log('error attaching ndef listener', err);
  //   }).subscribe(() => {      
  //     console.log("works");
  //     let message = [this.ndef.textRecord("hello, world")];
  //     this.nfc.write(message);
  //   }, (err:any) => console.log(err));
    
  // }   

  cracha(){
    let cracha = document.getElementById("cracha") as HTMLInputElement;

    let valorCracha = cracha.value;

    var config = {
      method: 'get',
      url: 'http://localhost:5265/badge/getEDV/' + valorCracha,
      headers: {},
      data: '',
    };

    var instance = this;
    axios(config)
      .then(function (response:any) {
        instance.edv = response.data;
        console.log(instance.edv);
        console.log("acima esta meu edv");

        instance.verifica();
      })
      .catch(function (error:any) {
        console.log(error);
      });
  }


  verifica(){

     //AQUI PRECISA IMPLEMENTAR COMO VAI SER PUXADO DO CRACHÁ

    localStorage.setItem("cpf", this.edv);

    var config = {
      method: 'get',
      url: 'http://localhost:5265/eventsbeneficiary/getcpfBeneficiario/' + this.edv,
      headers: {},
      data: '',
    };

    var instance = this;
    axios(config)
      .then(function (response:any) {
        console.log(response.data);
        instance.eventsBeneficiary = response.data;
        if(instance.eventsBeneficiary.length > 0 ){
          localStorage.setItem("terceiro", "false");
          localStorage.setItem("empresa" , "true");
          instance.router.navigate(['receive-product']);
        }
        else {
          alert("Funcionário não está registrado no evento!");

        }
      })
      .catch(function (error:any) {
        console.log(error);
      });

}
}
