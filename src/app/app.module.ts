import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

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
import { JwtInterceptor } from './services/jwt.interceptor';
import { PaymentComponent } from './payment/payment.component';
import { CustomPipe } from './pipes/custom.pipe';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { AuthenGuard } from './service/authen.guard';
import { DeActivatedGuard } from './service/candeactivated.guard';
//chart === Report
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component'


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
    RegisterComponent,
    PaymentComponent,
    CustomPipe,
    TransactionDetailComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    NgxChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    RestService,
    AuthenGuard,
    DeActivatedGuard
  ], //<==put service here
  bootstrap: [AppComponent]
})
export class AppModule { }
