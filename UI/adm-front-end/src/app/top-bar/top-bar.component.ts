import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  authTokenOwner = localStorage.getItem("authTokenOwner");

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    localStorage.removeItem("authToken");
    localStorage.removeItem("authTokenOwner");
    this.router.navigate(['']);
    
  }

}
