import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
    { path:'home', component: LoginComponent },

 { path: 'a', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
 
];
