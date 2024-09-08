import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponceModel } from '../Models/Interface/cutomer-list';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getCustomers(): Observable<APIResponceModel>{
    return this.http.get<APIResponceModel>("https://localhost:7133/api/Customer")
  }
}
