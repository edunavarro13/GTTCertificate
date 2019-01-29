import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginViewComponent } from './login-view/login-view.component';
import { RegisterViewComponent } from './register-view/register-view.component';
import { PageViewComponent } from './page-view/page-view.component';
import { UserViewComponent } from './user-view/user-view.component';

const routes: Routes = [
  { path: 'home', component: PageViewComponent },
  { path: 'register', component: RegisterViewComponent },
  { path: 'user', component: UserViewComponent },
  { path: 'login', component: LoginViewComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
