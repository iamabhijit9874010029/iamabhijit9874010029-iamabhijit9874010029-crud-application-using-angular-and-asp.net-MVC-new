import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(public employeeService: EmployeeService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.employeeService.GetEmployees();
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      EmployeeID: form?.value.EmployeeID,
      FirstName: form?.value.FirstName,
      LastName: form?.value.LastName,
      EmpCode: form?.value.EmpCode,
      Position: form?.value.Position,
      Office: form?.value.Office
    }
  }

  onSubmit(form: NgForm): void {
    if (form.value.EmployeeID === undefined || form.value.EmployeeID === null) {
      this.employeeService.PostEmployee(form.value)
        .subscribe(data => {
          this.resetForm(form);
          this.employeeService.GetEmployees();
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
