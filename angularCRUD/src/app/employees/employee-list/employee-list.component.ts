import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList!: Employee[];

  constructor(public employeeService: EmployeeService, private toastr: ToastrService) { }
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.employeeService.GetEmployees();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      lengthMenu: [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
      processing: true
    };
  }
  showForEdit(emp: Employee) {
    this.employeeService.selectedEmployee = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm("Are you sure to delete this record ?") === true) {
      this.employeeService.DeleteEmployee(id).subscribe({
        next: (data) => {
          this.toastr.warning("Deleted Successfully", "Employee Register");
          this.employeeService.GetEmployees();
        },
        error: (e) => console.error(e)
      });
    }
  }
}

function ngAfterViewChecked() {
  throw new Error('Function not implemented.');
}

