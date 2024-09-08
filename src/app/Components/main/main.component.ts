import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GetCustomerComponent } from "../get-customer/get-customer.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [GetCustomerComponent, RouterLinkActive, RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
