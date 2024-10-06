import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SimpleUserPageComponent } from './components/simpleUserPage/simpleUserPage.component';
import { ModerUserPageComponent } from './components/moder-user-page/moder-user-page.component';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'simpleUserPage', component: SimpleUserPageComponent },
    { path: 'moderUserPage', component: ModerUserPageComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}