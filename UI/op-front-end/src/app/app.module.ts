import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";  
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ReadBadgeComponent } from './read-badge/read-badge.component';
import { ReadCpfEdvComponent } from './read-cpf-edv/read-cpf-edv.component';
import { ReceiveProductComponent } from './receive-product/receive-product.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    ReadBadgeComponent,
    ReadCpfEdvComponent,
    ReceiveProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component:ReadBadgeComponent},
      {path: 'receive-product', component:ReceiveProductComponent},
      {path: 'read-cpf-edv', component:ReadCpfEdvComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
