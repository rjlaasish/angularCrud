import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ApiService} from "../shared/api.service";
import {EmployeeDashboardModel} from "./employee-dashboard.model";

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  employeeForm !: FormGroup
  employeeModelObj: EmployeeDashboardModel = new EmployeeDashboardModel();

  constructor(private _fb: FormBuilder, private apiService: ApiService) {
  }

  employeeData: any
  updateClick: boolean=false

  ngOnInit(): void {
    this.employeeForm = this._fb.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      salary: ['']
    })
    this.getEmployeeDetails();
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.employeeForm.value.firstName;
    this.employeeModelObj.lastName = this.employeeForm.value.lastName;
    this.employeeModelObj.address = this.employeeForm.value.address;
    this.employeeModelObj.salary = this.employeeForm.value.salary;


    this.apiService.postEmployee(this.employeeModelObj).subscribe(res => {
        console.log("Response", res);
        alert('Employee added successfully!')
        this.employeeForm.reset();
        this.getEmployeeDetails();
        let ref = document.getElementById("cancel");
        ref?.click();
      },
      err => {
        console.log("Something went wrong!")
      })

  }

  getEmployeeDetails() {
    this.apiService.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(data: any) {
    this.apiService.deleteEmployeeData(data).subscribe(res => {
      alert("Employee Deleted Sucessfully!");
    });
    this.getEmployeeDetails();
  }

  onEdit(row: any) {
    this.employeeModelObj.id = row.id;
    this.employeeForm.controls["firstName"].setValue(row.firstName);
    this.employeeForm.controls["lastName"].setValue(row.lastName);
    this.employeeForm.controls["address"].setValue(row.address);
    this.employeeForm.controls["salary"].setValue(row.salary);
    this.updateClick = true;
  }

  editEmployee() {
    this.employeeModelObj.firstName = this.employeeForm.value.firstName;
    this.employeeModelObj.lastName = this.employeeForm.value.lastName;
    this.employeeModelObj.address = this.employeeForm.value.address;
    this.employeeModelObj.salary = this.employeeForm.value.salary;
    this.apiService.updateEmployeeData(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
      alert("Employee Edited");
      this.getEmployeeDetails();
    })
    let ref = document.getElementById("cancel");
    ref?.click();
    this.updateClick=false;
  }

}
