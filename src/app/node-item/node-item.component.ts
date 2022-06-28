import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { ItemsService } from '../items.service';

@Component({
  selector: 'app-node-item',
  template : `
    <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Name</th>
      <th scope="col">description</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr  *ngFor="let item of itemList |async" >
      <td>{{item.id}}</td>
      <td>{{item.name}}</td>
      <td>{{item.description}}</td>
      <td>
        <button (click)="deleteStudent(item.id)" class="btn btn-outline-danger" > <i class="fas  fa-backspace"></i></button>
      </td>
    </tr>
  </tbody>
</table>
  
  `

})
export class NodeItemComponent implements OnInit {


  itemList:Observable<NodeItem[]>;
  deleteStudent = (id:any) => {
      

    this.service.deleteStudent(id).subscribe(data=>{
      console.log({data});
    })

    this.router.navigate(['/students'])
  }

  constructor(private service: ItemsService , private router:Router) {
    this.itemList = this.service.getStudents();
    //console.log(this.itemList);

  
  }

  ngOnInit(): void {
    
  }

}


export class NodeItem { id?: string; name?: string; description?:string ;password?:string }