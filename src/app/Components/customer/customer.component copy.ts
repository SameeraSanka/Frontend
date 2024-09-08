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
          alert("Customer updated successfully");
          this.loadCustomers();
          this.customerObj = new Customer(); // Reset customer object after update
        } else {
          alert(res.message);
        }
      }, error => {
        alert(error.message);
      });
    } else { // add new customer
      this.customerService.addCustomer(this.customerObj).subscribe((res: APIResponceModel) => {
        if (res.isSuccess) {
          alert("Customer added successfully");
          this.loadCustomers();
          this.customerObj = new Customer(); // Reset customer object after addition
        } else {
          alert(res.message);
        }
      }, error => {
        alert(error.message);
      });
    }
  }

  onDelete(id:number){
    const isDelete = confirm("Are you sure you want to delete");
    if(isDelete){
      this.customerService.deleteCustomer(id).subscribe((res: APIResponceModel) => {
        if(res.isSuccess){
          alert("Customer Deleted successfully")
          this.loadCustomers();
        }else{
          alert(res.message)
        }
      });
    }
  }

  onEdit(data: Customer) {
    this.customerObj = { ...data }; // Use spread operator to clone the data into customerObj
  }
}
