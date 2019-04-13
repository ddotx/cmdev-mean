import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StockComponent } from './stock/stock.component';
import { RegisterComponent } from './register/register.component';
import { StockCreateComponent } from './stock-create/stock-create.component';
import { StockEditComponent } from './stock-edit/stock-edit.component';
import { ShopComponent } from './shop/shop.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ReportComponent } from './report/report.component';
import { PaymentComponent } from './payment/payment.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { AuthenGuard } from './service/authen.guard';
import { DeActivatedGuard } from './service/candeactivated.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login', component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'stock', component: StockComponent, canActivate:[AuthenGuard]},
  {path: 'stock/create', component: StockCreateComponent, canActivate:[AuthenGuard], canDeactivate:[DeActivatedGuard]},
  {path: 'stock/edit/:id', component: StockEditComponent, canActivate:[AuthenGuard], canDeactivate:[DeActivatedGuard]},
  { path: 'shop', component: ShopComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: 'transaction/detail/:id', component: TransactionDetailComponent},
  { path: 'report', component: ReportComponent },
  { path: 'payment', component: PaymentComponent},
  { path: 'dashboard', component: DashboardComponent},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
