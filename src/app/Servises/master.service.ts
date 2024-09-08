import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIResponceModel } from '../Models/Interface/cutomer-list';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Customer } from '../Models/Class/Customer';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http:HttpClient) { }

  getCustomers(): Observable<APIResponceModel>{
    return this.http.get<APIResponceModel>(environment.API_URL);
  }

  addCustomer(obj:Customer):Observable<APIResponceModel>{
    return this.http.post<APIResponceModel>(environment.API_URL, obj);
  }

  deleteCustomer(id: number): Observable<APIResponceModel> {
    const url = environment.API_URL +`${id}`;
    return this.http.delete<APIResponceModel>(url);
  }

  updateCustomer(id:number, customerData: any): Observable<APIResponceModel>{
    const url = environment.API_URL +`${id}`;
    return this.http.put<APIResponceModel>(url,customerData);
  }


}
