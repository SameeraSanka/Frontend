import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ICutomerList } from '../../Models/Interface/cutomer-list';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables'

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, DataTablesModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {

  dataList: ICutomerList [] = [];
  http = inject(HttpClient);

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.http.get("https://localhost:7133/api/Customer").subscribe((response: any) => {
      this.dataList = response.data;
    })

  }

}
