import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Home continua fixa em app.component.html
  {
    path: '',
    component: LayoutComponent, // Todas as páginas internas usarão este layout
    children: [
      { path: 'register', component: RegisterComponent },
    ]
  }
];
