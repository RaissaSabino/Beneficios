import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgChartsModule} from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { EventQuerryComponent } from './event-querry/event-querry.component';
import { SeasonComponent } from './season/season.component';
import { StationRegisterComponent } from './station-register/station-register.component';
import { DataTablesModule } from "angular-datatables";
import { ModalAlertComponent } from './modal-alert/modal-alert.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BeneficiaryRegisterComponent } from './beneficiary-register/beneficiary-register.component';
// import { BenefitsRegisterComponent } from './benefits-register/benefits-register.component';
import { EventsRegisterComponent } from './events-register/events-register.component';
import { RouterModule } from '@angular/router';
import { AdmLoginComponent } from './adm-login/adm-login.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { ChartComponent } from './chart/chart.component';
import { AdmBeneficiaryComponent } from './adm-beneficiary/adm-beneficiary.component';
// import { AdmComponent } from './adm/adm.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    EventQuerryComponent,
    SeasonComponent,
    StationRegisterComponent,
    ModalAlertComponent,
    BeneficiariesComponent,
    BeneficiaryRegisterComponent,
    EventsRegisterComponent,
    AdmLoginComponent,
    BenefitsComponent,
    ChartComponent,
    AdmBeneficiaryComponent,
    // AdmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgChartsModule,
    DataTablesModule,
    RouterModule.forRoot([
      {path: '', component: AdmLoginComponent},
      {path: 'event-query', component: EventQuerryComponent}
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
