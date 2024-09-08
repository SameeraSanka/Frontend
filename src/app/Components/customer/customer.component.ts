import { Component, inject, OnInit } from '@angular/core';

import { Customer } from '../../Models/Class/Customer';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../Servises/master.service';
import { APIResponceModel, ICutomerList } from '../../Models/Interface/cutomer-list';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';


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

  loadCustomers() {
    this.customerService.getCustomers().subscribe((res: APIResponceModel) => {
      this.customerList = res.data;
      this.isLoader = false;
    }, error => {
      alert(error.message)
      this.isLoader = false;
    })

  }
  
  onSaveClient() {
    if (this.customerObj.id) { // (Update existing customer)
      this.customerService.updateCustomer(this.customerObj.id, this.customerObj).subscribe((res: APIResponceModel) => {
        if (res.isSuccess) {
          // Success SweetAlert for update
          Swal.fire('Updated!', 'Customer updated successfully', 'success');
          this.loadCustomers();
          this.customerObj = new Customer(); // Reset customer object after update
        } else {
          // Error SweetAlert for update
          Swal.fire('Error!', res.message, 'error');
        }
      }, error => {
        // Error SweetAlert for update failure
        Swal.fire('Error!', error.message, 'error');
      });
    } else { // Add new customer
      this.customerService.addCustomer(this.customerObj).subscribe((res: APIResponceModel) => {
        if (res.isSuccess) {
          // Success SweetAlert for add
          Swal.fire('Added!', 'Customer added successfully', 'success');
          this.loadCustomers();
          this.customerObj = new Customer(); // Reset customer object after addition
        } else {
          // Error SweetAlert for add
          Swal.fire('Error!', res.message, 'error');
        }
      }, error => {
        // Error SweetAlert for add failure
        Swal.fire('Error!', error.message, 'error');
      });
    }
  }


  onDelete(id: number) {
    // SweetAlert confirmation box
    Swal.fire({
      title: 'Are you sure you want to delete?',
      text: 'You will not be able to recover this customer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion if confirmed
        this.customerService.deleteCustomer(id).subscribe((res: APIResponceModel) => {
          if (res.isSuccess) {
            // Success message using SweetAlert
            Swal.fire('Deleted!', 'Customer has been deleted successfully.', 'success');
            this.loadCustomers(); // Reload the customer list
          } else {
            Swal.fire('Error!', res.message, 'error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Optional message for cancellation
        Swal.fire('Cancelled', 'Customer deletion has been cancelled.', 'info');
      }
    });
  }

  onEdit(data: Customer) {
    this.customerObj = { ...data }; // Use spread operator to clone the data into customerObj
  }
}
