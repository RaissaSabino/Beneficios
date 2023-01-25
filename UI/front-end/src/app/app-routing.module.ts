import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyBenefitsComponent } from './my-benefits/my-benefits.component';
import { LoginComponent } from './login/login.component';
import { ThirdPartyPageComponent } from './third-party-page/third-party-page.component';

const routes: Routes = [
{path:'my-benefits',component:MyBenefitsComponent},
{path:'login',component:LoginComponent},
{path:'third-party-page',component:ThirdPartyPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
