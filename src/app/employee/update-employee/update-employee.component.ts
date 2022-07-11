import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Employee>;

  eamilPattern:string;
  insertFrm: FormGroup;
  param:number;
  emloyees : Employee;
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router:Router,private readonly afs: AngularFirestore) { 

    this.itemsCollection = afs.collection<Employee>('employees')

    this.param = 0;

    this.eamilPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    this.insertFrm = this.fb.group({
      // email:['',[Validators.required,Validators.minLength(6), Validators.maxLength(20)],Validators.pattern(this.eamilPattern)],
      email:['',[Validators.required]],
      address:['', Validators.required],
      numberPhone:['', Validators.required],
      position:['', Validators.required],
      name:['', Validators.required],
      docid:['', Validators.required],
      id:['', Validators.required],
   })
  }
  onSubmit(){
    	let employeeDetail : Employee = {};
      employeeDetail.id =  this.insertFrm.controls["id"].value;
      employeeDetail.email =  this.insertFrm.controls["email"].value;
      employeeDetail.numberPhone =  this.insertFrm.controls["numberPhone"].value;
      employeeDetail.name =  this.insertFrm.controls["name"].value;
      employeeDetail.position =  this.insertFrm.controls["position"].value;
      employeeDetail.address =  this.insertFrm.controls["address"].value;

      let docId = this.emloyees.docid;


      this.itemsCollection.doc(docId).update(employeeDetail);
      
      Swal.fire({
        icon: 'success',
        title: 'Thành công',
        text: `Bạn đã cập nhật thành công nhân viên ${employeeDetail.name}`,
      })

      this.router.navigateByUrl("/admin/employees")
  }

  // update(docid:string,id:string, name:string,  :string){
  //   let docId =docid
  //   let item : Item = {};
  //   item.id=id
  //   item.name = name
  //   item.classID=classID
  //   this.itemsCollection.doc(docId).update(item);
  // }


  ngOnInit(): void {
    //Lay gia trị của tham số route----------------
    this.route.paramMap.subscribe( paramMap => {// quan tam den su thay doi param
      this.param = Number(paramMap.get('id'));
      console.log(this.param)
    })
    const routeParams = this.route.snapshot.paramMap;//khong quan tam den su thay doi param ve sau
    const id = routeParams.get('id');
    
    this.afs.collection('employees').ref.doc(id).get().then(data=>{
      // console.log(data.data());
      this.emloyees = data.data();
      this.insertFrm.controls["email"].setValue(this.emloyees.email)
      this.insertFrm.controls["address"].setValue(this.emloyees.address)
      this.insertFrm.controls["numberPhone"].setValue(this.emloyees.numberPhone)
      this.insertFrm.controls["position"].setValue(this.emloyees.position)
      this.insertFrm.controls["name"].setValue(this.emloyees.name)
      this.insertFrm.controls["docid"].setValue(this.emloyees.docid)
      this.insertFrm.controls["id"].setValue(this.emloyees.id)
    })
    
  }

}
