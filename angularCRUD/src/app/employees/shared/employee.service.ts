import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:44373/api/Employee/';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  selectedEmployee!: Employee;
  employeeList!: Employee[];

  constructor(private http: HttpClient) { }

  PostEmployee(data: Employee): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  PutEmployee(id: number, data: Employee): Observable<any> {
    return this.http.put(baseUrl + id, data);
  }

  GetEmployees(){
    this.http.get<Employee[]>(baseUrl).subscribe(data=>{
      this.employeeList = data;
    })
  }

  DeleteEmployee(id: number): Observable<any> {
    return this.http.delete(baseUrl + id);
  }
}
