import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class IpServiceService {

  constructor(public http:HttpClient) {
    
   }

   public getIPAddress()  
  {  
    return this.http.get("http://api.ipify.org/?format=json");  
  } 
}
