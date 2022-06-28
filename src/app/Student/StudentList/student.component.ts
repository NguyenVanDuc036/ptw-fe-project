import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NodeItem} from '../../models/item'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { ItemsService } from '../../items.service';
@Component({
    selector: 'app-studentlist',
    template: `
        <form [formGroup] ="insertFrm" class="w-50" (ngSubmit)="onSubmit()">
  <h4>Add student</h4>
    <div class="form-group">
        <label for="id">Id</label>
        <input formControlName="id" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter id">
        <div *ngIf="insertFrm.controls['id'].hasError('required') && (insertFrm.controls['id'].dirty ||insertFrm.controls['id'].touched)">
            <p class="text-danger" >Id is not valid</p>
        </div>
    </div>

    <div class="form-group">
      <label for="name">Name</label>
      <input formControlName="name"  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name">
      <div *ngIf="insertFrm.controls['name'].hasError('required') && (insertFrm.controls['name'].dirty ||insertFrm.controls['name'].touched)">
        <p class="text-danger" >Name is not valid</p>
    </div>
    </div>

    <div class="form-group">
        <label for="description">Description</label>
        <input formControlName="description"  type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Decription">
        <div *ngIf="insertFrm.controls['description'].hasError('required') && (insertFrm.controls['description'].dirty ||insertFrm.controls['description'].touched)">
          <p class="text-danger" >Description is not valid</p>
      </div>
      </div>

      <div class="form-group">
        <label for="description">Password</label>
        <input formControlName="password"  type="password" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Password">
        <div *ngIf="insertFrm.controls['password'].hasError('required') && (insertFrm.controls['password'].dirty ||insertFrm.controls['password'].touched)">
          <p class="text-danger" >Password is not valid</p>
      </div>
      </div>


    <button [disabled]="!insertFrm.valid" type="submit" class="btn btn-primary">Submit</button>
  </form>

    `
})

export class StudentComponent {
    insertFrm: FormGroup;
    constructor(private fb: FormBuilder , private itemsr: ItemsService , private router:Router) {
      this.insertFrm = this.fb.group({
        id:['',Validators.required], 
        name:['',[Validators.required , Validators.minLength(4)]],
        description:['',[Validators.required]],
        password:['', Validators.required],
        /*
        password:['', Validators.required],
        confirmpassword:['', Validators.required]
        },{
        validator: MustMatch('password', 'confirmpassword')}//hàm tự viết SV có thể bỏ qua không kiểm tra cũng được
        */
     }
    )
    }
  
    onSubmit(){			
      if (this.insertFrm.invalid)
      {
        return;
      }		
      let item = new NodeItem();
      item.id = this.insertFrm.controls["id"].value;
      item.name = this.insertFrm.controls["name"].value;
      item.description = this.insertFrm.controls["description"].value;
      item.password = this.insertFrm.controls["password"].value;
  
      this.itemsr.insertItem(item).subscribe(data=>{
        this.router.navigate(['/students'])
      })
  
    }
}