import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 
  //verifica se está logado ou não para rederizar  o login ou a topbar com o menu
  token=localStorage.getItem("authToken")

}
