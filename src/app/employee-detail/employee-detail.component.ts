import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { Employee } from '../models/employee';


@Component({
  selector: 'app-update-employee',
  templateUrl: './employee-detail.component.html',
})
export class EmployeeDetailComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Employee>;

  eamilPattern:string;
  insertFrm: FormGroup;
  param:number;
  emloyees : Employee;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router:Router,private readonly afs: AngularFirestore) { 

    this.itemsCollection = afs.collection<Employee>('employees')

    this.param = 0;

  }



  ngOnInit(): void {
    //Lay gia trị của tham số route----------------
    this.route.paramMap.subscribe( paramMap => {// quan tam den su thay doi param
      this.param = Number(paramMap.get('id'));
      console.log(this.param)
    })
    const routeParams = this.route.snapshot.paramMap;//khong quan tam den su thay doi param ve sau
    const id = routeParams.get('id');
    
    this.afs.collection('employees').ref.doc(id).get().then(data=>{
      this.emloyees = data.data();
    })
    
  }

}
