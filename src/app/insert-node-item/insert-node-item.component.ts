import { ItemsService } from './../items.service';
import { NodeItem } from './../node-item/node-item.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-insert-node-item',
  templateUrl: './insert-node-item.component.html',
  styleUrls: ['./insert-node-item.component.css']
})
export class InsertNodeItemComponent {

  insertFrm: FormGroup;
  constructor(private fb: FormBuilder , private itemsr: ItemsService) {
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
		

    let item = new NodeItem();
    item.id = this.insertFrm.controls["id"].value;
    item.name = this.insertFrm.controls["name"].value;
    item.description = this.insertFrm.controls["description"].value;
    item.password = this.insertFrm.controls["password"].value;

    this.itemsr.insertItem(item).subscribe(data=>{
      console.log({data});
    })

  }
  

}
