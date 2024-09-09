import { Component, inject, OnInit } from '@angular/core';

import { Customer } from '../../Models/Class/Customer';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../Servises/master.service';
import { APIResponceModel, ICutomerList } from '../../Models/Interface/cutomer-list';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  

  customerObj: Customer = new Customer();
  customerList: ICutomerList[] = [];
  isLoader: boolean = true;

  customerService = inject(MasterService)
  ngOnInit(): void {
    this.loadCustomers();
  }

  async loadCustomers() {
    this.isLoader = true;
    
    try {
      const res: APIResponceModel = await firstValueFrom(this.customerService.getCustomers());
      this.customerList = res.data;
    } catch (ex) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error loading customers',
        confirmButtonText: 'OK'
      });
    } finally {
      this.isLoader = false;
    }
  }

  async onSaveClient() {
    try {
      let res: APIResponceModel;
  
      if (this.customerObj.id) { // Update existing customer
        res = await firstValueFrom(this.customerService.updateCustomer(this.customerObj.id, this.customerObj));
        if (res.isSuccess) {
          Swal.fire('Updated!', 'Customer updated successfully', 'success');
          this.loadCustomers();
          this.customerObj = new Customer(); // Reset customer object after update
        } else {
          Swal.fire('Error!', res.message, 'error');
        }
      } else { // Add new customer
        res = await firstValueFrom(this.customerService.addCustomer(this.customerObj));
        if (res.isSuccess) {
          Swal.fire('Added!', 'Customer added successfully', 'success');
          this.loadCustomers();
          this.customerObj = new Customer(); // Reset customer object after addition
        } else {
          Swal.fire('Error!', res.message, 'error');
        }
      }
    } catch (error: any) {
      Swal.fire('Error!', error.message, 'error');
    }
  }


  async onDelete(id: number) {
    // SweetAlert confirmation box
    const result = await Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'You will not be able to recover this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    });
  
    if (result.isConfirmed) {
      try {
        // Proceed with deletion if confirmed
        const res: APIResponceModel = await firstValueFrom(this.customerService.deleteCustomer(id));
  
        if (res.isSuccess) {
          // Success message using SweetAlert
          Swal.fire('Deleted!', 'Customer has been deleted successfully.', 'success');
          this.loadCustomers(); // Reload the customer list
        } else {
          Swal.fire('Error!', res.message, 'error');
        }
      } catch (error: any) {
        Swal.fire('Error!', error.message, 'error');
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      // Optional message for cancellation
      Swal.fire('Cancelled', 'Customer deletion has been cancelled.', 'info');
    }
  }

  async onEdit(data: Customer) {
    this.customerObj = { ...data };
  }
}
