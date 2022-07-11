import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-node-item',
  template : `
    <ul>
    <li  *ngFor="let item of itemList ">
        {{item.id}} - {{item.name}}
    </li>
</ul>
  `
})
export class AddStudentComponent implements OnInit {



    itemList:NodeItem[] = []
  constructor(private service: ItemsService) {
    this.service.getItems().subscribe((result:NodeItem[])=>{

        this.itemList = result;
        
    }, (errors)=> {
        console.log(errors.error)
    })
    
  }


  

 
  
  

  ngOnInit(): void {
    
  }

}


export class NodeItem { id?: string; name?: string; description?:string ;password?:string }