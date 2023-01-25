import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadBadgeComponent } from './read-badge/read-badge.component';
import { ReadCpfEdvComponent } from './read-cpf-edv/read-cpf-edv.component';
import { ReceiveProductComponent } from './receive-product/receive-product.component';
const routes: Routes = [
  {path:'read-badge',component:ReadBadgeComponent},
  {path:'read-cpf-edv',component:ReadCpfEdvComponent},
  {path:'receive-product',component:ReceiveProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
