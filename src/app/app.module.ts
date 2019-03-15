import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { ReportComponent } from './report/report.component';
import { ShopComponent } from './shop/shop.component';
import { StockComponent } from './stock/stock.component';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { StockEditComponent } from './stock-edit/stock-edit.component';
import { TransactionComponent } from './transaction/transaction.component';
import { RestService } from './services/rest.service';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    ReportComponent,
    ShopComponent,
    StockComponent,
    StockCreateComponent,
    StockEditComponent,
    TransactionComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [RestService], //<==put service here
  bootstrap: [AppComponent]
})
export class AppModule { }
