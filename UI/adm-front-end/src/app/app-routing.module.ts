import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonComponent } from './season/season.component';
import { EventQuerryComponent } from './event-querry/event-querry.component';
import { StationRegisterComponent } from './station-register/station-register.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { EventsRegisterComponent } from './events-register/events-register.component';
import { BeneficiaryRegisterComponent } from './beneficiary-register/beneficiary-register.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ChartComponent } from './chart/chart.component';
import {AdmLoginComponent} from './adm-login/adm-login.component';
import {AdmBeneficiaryComponent} from './adm-beneficiary/adm-beneficiary.component';

const routes: Routes = [
  
  {path:'',component:AdmLoginComponent},
  {path:'season',component:SeasonComponent},
  {path:'event-querry',component:EventQuerryComponent}, 
  {path:'station-register', component:StationRegisterComponent},
  {path:'beneficiaries', component:BeneficiariesComponent},
  {path:'events-register', component:EventsRegisterComponent},
  {path:'beneficiary-register', component:BeneficiaryRegisterComponent},
  {path:'benefits', component:BenefitsComponent},
  {path:'chart', component:ChartComponent},
  {path:'adm-beneficiary',component:AdmBeneficiaryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
