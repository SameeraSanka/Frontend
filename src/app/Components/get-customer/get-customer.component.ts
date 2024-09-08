import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../Servises/master.service';
import { APIResponceModel, ICutomerList } from '../../Models/Interface/cutomer-list';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-customer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './get-customer.component.html',
  styleUrl: './get-customer.component.css'
})
export class GetCustomerComponent implements OnInit {

  dataList: ICutomerList[] = [];
  masterService = inject(MasterService)

  ngOnInit(): void {
    this.masterService.getCustomers().subscribe((response: APIResponceModel)=>{
      this.dataList = response.data;
    },error=>{
      alert(error.message)
    })  
  }

}
