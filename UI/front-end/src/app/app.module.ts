import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MyBenefitsComponent } from './my-benefits/my-benefits.component';
import { ThirdPartyPageComponent } from './third-party-page/third-party-page.component';
import { LoginComponent } from './login/login.component';
import { GeneralTopBarComponent } from './general-top-bar/general-top-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    MyBenefitsComponent,
    ThirdPartyPageComponent,
    LoginComponent,
    GeneralTopBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'mybenefits', component: MyBenefitsComponent},
      {path: 'thirdparty', component: ThirdPartyPageComponent},
      {path: 'login', component: LoginComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
