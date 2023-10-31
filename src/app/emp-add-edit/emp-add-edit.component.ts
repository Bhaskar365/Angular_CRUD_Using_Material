import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{

  empForm : FormGroup;

  education:string[] = [
    'X',
    'XII',
    'Diploma',
    'Graduation/Bachelors',
    'Post Graduation/Masters'
  ];

  constructor(private fb:FormBuilder,
              private empServ:EmployeeService,
              private _dialogRef:MatDialogRef<EmpAddEditComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any,
              private coreServ:CoreService 
              )  
  {
      this.empForm = this.fb.group({
      firstName: '',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      package:''
    });
  }

  ngOnInit():void { 
    this.empForm.patchValue(this.data);
   }

  onFormSubmit()
  {
     if(this.empForm.valid)
     {
      if(this.data)
      {
      this.empServ.updateEmployees(this.data.id,this.empForm.value).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.coreServ.openSnackBar('Employee details updated');
          this._dialogRef.close(true);
          
        },
        error:(err:any)=>{
          console.log(err);
        },
      });
     } 
     else
     {
      this.empServ.addEmployees(this.empForm.value).subscribe({
        next:(res:any)=>{
          this.coreServ.openSnackBar('Employee added successfully');
          this._dialogRef.close(true);
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }
   }
  }
}
