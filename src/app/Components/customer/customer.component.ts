import { Component, inject, OnInit } from '@angular/core';

import { Customer } from '../../Models/Class/Customer';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../Servises/master.service';
import { APIResponceModel, ICutomerList } from '../../Models/Interface/cutomer-list';
import { CommonModule } from '@angular/common';

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
    debugger;
    this.customerService.addCustomer(this.customerObj).subscribe((res: APIResponceModel) => {
      if(res.isSuccess){
        alert("Customer added successfully")
        this.loadCustomers();
        this.customerObj = new Customer();
      }else{
        alert(res.message)
      }
    })

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
}
