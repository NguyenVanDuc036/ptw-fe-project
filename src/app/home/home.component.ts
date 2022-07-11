import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

export interface Item{id?: string, name?: string, classID?: string}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {

  private employeesCollection: AngularFirestoreCollection<Employee>;

  employees : Employee[]=[];
  config: any;

  displayedColumns: string[] = ['id', 'name', 'address', 'email','numberPhone','position','actions'];

  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  eamilPattern:string;
  insertFrm: FormGroup;
  
  constructor(private fb: FormBuilder ,private readonly afs: AngularFirestore) {

  //   this.eamilPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
    this.insertFrm = this.fb.group({
      // email:['',[Validators.required,Validators.minLength(6), Validators.maxLength(20)],Validators.pattern(this.eamilPattern)],
      // address:['', Validators.required],
      // numberPhone:['', Validators.required],
      // position:['', Validators.required],
      // name:['', Validators.required],
   })
    



    this.employeesCollection = this.afs.collection<Employee>('employees');

    // this.employeesCollection.valueChanges( { idField: 'idField' }).subscribe(data=>{
    //   this.employees=data;
      
      
    //   this.dataSource = new MatTableDataSource(this.employees);
      
    //   this.config = {
    //     itemsPerPage: 5,
    //     currentPage: 1,
    //     totalItems: this.employees.length
    //   };

    // });


   

  }

  ngOnInit() {

    this.employeesCollection.valueChanges( { idField: 'idField' }).subscribe(data=>{
      this.employees=data;
      this.dataSource = new MatTableDataSource(this.employees);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
    
  }

  // update(docid:string,id:string, name:string, classID:string){
  //   let docId =docid
  //   let item : Item = {};
  //   item.id=id
  //   item.name = name
  //   item.classID=classID
  //   this.itemsCollection.doc(docId).update(item);
  // }


  deleteEmployee(docId:any){

    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Bạn sẽ không có khả năng hoàn nguyên lại!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý!!'
    }).then((result) => {
      
      if (result.isConfirmed) {
        this.employeesCollection.doc(docId).delete();
        Swal.fire(
          'Xóa thành công!',
          'Bạn đã xóa thành công',
          'success'
        )
      }
    })
    
    
    // location.href="/admin/employees"
  }


  pageChanged(event:number){
    this.config.currentPage = event;
  }

  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
