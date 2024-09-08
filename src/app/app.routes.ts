import { Routes } from '@angular/router';
import { CustomerComponent } from './Components/customer/customer.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
    },
    { 
        path: 'Customer', 
        component: CustomerComponent 
    }  
];
