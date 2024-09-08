import { Component } from '@angular/core';
import { GetCustomerComponent } from "../get-customer/get-customer.component";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [GetCustomerComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

}
