import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { EmployeeListComponent } from '../employee-list/employee-list.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService, private toastr: ToastrService, private employeeListComponent: EmployeeListComponent) { }
  ngOnInit(): void {
    // this.employeeListComponent.retrieveEmployees();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      EmployeeID: -1,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    }
  }

  onSubmit(form: NgForm): void {
    if (form.value.EmployeeID === -1) {
      this.employeeService.PostEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeListComponent.retrieveEmployees();
          this.toastr.success('New Record Added Successfully', 'Employee Register');
          console.log(data);
        }
        )
    }
    else {
      this.employeeService.PutEmployee(form.value.EmployeeID, form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.GetEmployees();
          this.toastr.success('Record Updated Successfully', 'Employee Register');
          console.log(data);
        }
        )
    }

  }
}
