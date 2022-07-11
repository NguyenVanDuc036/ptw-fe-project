import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../models/employee';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insert-employee',
  templateUrl: './insert-employee.component.html',
  styleUrls: ['./insert-employee.component.css']
})
export class InsertEmployeeComponent implements OnInit {
  isSubmit: boolean = false; 
  private itemsCollection: AngularFirestoreCollection<Employee>;
  //items: Observable<Item[]>;
  items : Employee[]=[];
  config: any;
  employee : Employee;

  eamilPattern:string;
  insertFrm: FormGroup;
  constructor(private fb: FormBuilder ,private readonly afs: AngularFirestore,	private router: Router) { 
    this.eamilPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    this.insertFrm = this.fb.group({
      email:['',Validators.required],
      address:['', Validators.required],
      numberPhone:['', Validators.required],
      position:['', Validators.required],
      name:['', Validators.required],
   })

   this.itemsCollection = this.afs.collection<Employee>('employees');

  }

  ngOnInit(): void {

  }

  add(docid:string, id:string, name:string ,email:string,address:string,position:string,numberPhone:number){
    let item: Employee={};
    item.id=id
    item.docid=docid
    item.name=name;
    item.email=email;
    item.address=name;
    item.position=position;
    item.numberPhone=numberPhone;
    this.itemsCollection.doc(docid).set(Object.assign({}, item));

    Swal.fire({
      icon: 'success',
      title: 'Thêm nhân viên thành công',
    })

    this.router.navigateByUrl("/admin/employees")

  }
  
   onSubmit(){

    this.isSubmit = true;
    let employee = new Employee();
    employee.name =   String(this.insertFrm.controls["name"].value);
    employee.position =   String(this.insertFrm.controls["position"].value);
    employee.email =   String(this.insertFrm.controls["email"].value);
    employee.address =   String(this.insertFrm.controls["address"].value);
    employee.numberPhone =   Number(this.insertFrm.controls["numberPhone"].value);
    employee.id =  String(Date.now())
    employee.docid =  String(Date.now())
     if (this.insertFrm.invalid)
    {
      
      return;
    }else{
      this.add(employee.docid, employee.id, employee.name , employee.email,employee.address,employee.position, employee.numberPhone)
    }		

   
    
    
    

  }
  

}
