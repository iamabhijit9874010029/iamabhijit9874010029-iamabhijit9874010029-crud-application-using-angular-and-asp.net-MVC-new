import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://localhost:44373/api/Employee/';
// employeeList :[];

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  public employeeList: any;

  selectedEmployee!: Employee;
  // employeeList!: Employee[];

  constructor(private http: HttpClient) { }

  PostEmployee(data: Employee): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  PutEmployee(id: number, data: Employee): Observable<any> {
    return this.http.put(baseUrl + id, data);
  }

  GetEmployees(): Observable<Employee[]> {
     this.employeeList = this.http.get<Employee[]>(baseUrl);
    return this.http.get<Employee[]>(baseUrl);
  }

  DeleteEmployee(id: number): Observable<any> {
    return this.http.delete(baseUrl + id);
  }
}
