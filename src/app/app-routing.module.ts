import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StockComponent } from './stock/stock.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'login', component: LoginComponent},
  {path:'register',component: RegisterComponent},
  {path:'stock', component: StockComponent},
  //{ path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
